import Ember from 'ember';

export default Ember.Controller.extend({
  formatter: Ember.inject.service(),
  Range: ace.require('ace/range').Range,
  rangeLines: [],
  summaryObject: [],

  // highlight warning lines from ace-editor
  addMarker(beginLine) {
    let rangeid = ace.edit("editor").session.addMarker(
      new this.Range(beginLine-1, 0, beginLine, 0), "auto-formatted-fields", "line");
    // stored for cleaning maker purposes
    this.get('rangeLines').addObject(rangeid);
  },

  // clear all highlighted lines from ace-editor and clear summary
  clearMarkers() {
    Ember.$.each(this.get("rangeLines"), (index, range) => {
      ace.edit("editor").session.removeMarker(range);
    });
    this.set('rangeLines', []);
    this.set('summaryObject', []);
  },

  findLine(posi) {
    return (this.get('formatter').get('bibtex').get('bibtex').substring(0, posi).match(/\n/g) || []).length + 1;
  },

  actions: {
    clear() {
      bnLogger.send({ version: bnConfig.version, route: 'editor', action: 'clear', date: new Date() });
      ace.edit("editor").setValue("");
      this.get('formatter').get('bibtex').clear();
      this.clearMarkers();
    },

    focusLine(line) {
      ace.edit("editor").gotoLine(line);
    },

    normalize() {
      bnLogger.send({ version: bnConfig.version, route: 'editor', action: 'normalize', date: new Date() });
      this.clearMarkers();
      const input = ace.edit("editor").getValue();
      // textarea was empty
      if (input === ""){

        swal({
          title: "Your entry is empty.",
          timer: 2000
        });
        return;

      }

      try {
        this.get('formatter').create(input);
        this.get('formatter').get('bibtex').normalize();

        // no bibtex entries were detected
        if (this.get('formatter').get('bibtex').get('bibtex') === ""){
          swal({
            title: "Your entry may not be on <small>bibtex</small> standard.",
            html: true
          });

          return;
        }
      } catch (parserError) {

        // exception thrown by bibtexParse.js
        ace.edit("editor").gotoLine(this.findLine(parserError.line));

        //there is a citationKey
        if(parserError.key) {
          parserError.key = `at entry <small>${parserError.key}</small>,`;
        }

        swal({
          title: `Your entry is incorrect, check one of the following, ${parserError.key} line <small>${this.findLine(parserError.line)}</small>:`,
          text: parserError.message,
          html: true
        });
        return;

      }

      let annotations = [], lineObjectType = "";
      ace.edit("editor").setValue(this.get('formatter').get('bibtex').get('bibtex') || '');
      Ember.$.each(this.get('formatter').get('bibtex').get('lines'), (index, lineObject) => {
        // define type of annotation by using type of error
        this.get('summaryObject').addObject(lineObject);
        switch (lineObject.type) {
          case 'duplicatedKey':
          case 'invalidField':
            lineObjectType = 'error';
            break;
          case 'missingField':
            lineObjectType = 'warning';
            break;
          default:
            lineObjectType = 'info';
        }
        // mark a specific line
        this.addMarker(lineObject.line);
        annotations.push({
          row: (lineObject.line-1),
          type: lineObjectType, // error|warning|info
          text: lineObject.message
        });
      });

      // add all 'breakpoints' (officially called annotations)
      ace.edit("editor").session.setAnnotations(annotations);
      // focus on first line with error
      let firstLineError = 0;
      if(this.get('formatter').get('bibtex').get('lines')[0]) {
        firstLineError = this.get('formatter').get('bibtex').get('lines')[0].line;
      }
      ace.edit("editor").gotoLine(firstLineError);

      if (this.rangeLines.length > 0) {
        swal({
          text: 'We found errors in your BibTeX file!',
          title: 'Warning',
          type: 'warning'
        });
      } else {
        this.clearMarkers();
        swal({
          text: 'We didn\'t find errors in your bibtex file.',
          title: 'Congratulations',
          type: 'success'
        });
      }
    },

    buildEditor() {
      const bibtex = this.get('formatter').get('bibtex');
      ace.edit("editor").setValue(bibtex.get('bibtex') || '');
    },

    copyToClipboard() {
      bnLogger.send({ version: bnConfig.version, route: 'editor', action: 'copy', date: new Date() });
      const $tmp = Ember.$('<textarea>');
      Ember.$('body').append($tmp);
      $tmp.val(ace.edit("editor").session.getValue()).select();
      document.execCommand('copy');
      $tmp.remove();

      swal({
        title: 'Bibtex copied to clipboard!',
        timer: 2000
      });
    },

    save() {
      bnLogger.send({ version: bnConfig.version, route: 'editor', action: 'download', date: new Date() });
      if(this.get('formatter').get('bibtex').get('bibtex')) {
        const file = new File([this.get('formatter').get('bibtex').get('bibtex')], "references-bibtex-normalizer.bib", {type: "text/plain;charset=utf-8"});
        saveAs(file);
      }
    },
  }
});
