import Ember from 'ember';

export default Ember.Controller.extend({
  formatter: Ember.inject.service(),
  cookie: Ember.inject.service(),
  Range: ace.require('ace/range').Range,
  rangeLines: [],
  summaryObject: [],

  // highlight warning lines from ace-editor
  addMarker(beginLine) {
    let rangeid = ace.edit("formatter").getSession().addMarker(
      new this.Range(beginLine-1, 0, beginLine, 0), "auto-formatted-fields", "line");
    // stored for cleaning maker purposes
    this.get('rangeLines').addObject(rangeid);
  },

  // clear all highlighted lines from ace-editor and clear summary
  clearMarkers() {
    Ember.$.each(this.get("rangeLines"), (index, range) => {
      ace.edit("formatter").getSession().removeMarker(range);
    });
    this.set('rangeLines', []);
    this.set('summaryObject', []);
  },

  actions: {
    clear() {
      ace.edit("formatter").setValue("");
      this.get('formatter').get('bibtex').clear();
      this.clearMarkers();
    },

    focusLine(line) {
      ace.edit("formatter").gotoLine(line);
    },

    normalize() {
      this.clearMarkers();
      const input = ace.edit("formatter").getValue();
      // textarea was empty
      if (input === ""){

        swal({
          title: "Your entry is empty.",
          timer: 2000
        });
        return;

      }

      try {
        this.get('formatter').create(input, this.get('cookie').getAllCookie());
        console.log('BEFORE');
        this.get('formatter').get('bibtex').normalize();
        console.log('AFTER');

        // no bibtex entries were detected
        if (this.get('formatter').get('bibtex').get('bibtex') === ""){
          swal({
            title: "Your entry may not be on <small>bibtex</small> standard.",
            html: true
          });

          return;
        }
      } catch (parserError) {
        console.error(parserError);
        // exception thrown by bibtexParse.js
        ace.edit("formatter").gotoLine(parserError.line);
        swal({
        	title: `Your entry is incorrect, check one of the following at entry ${parserError.key+1}:`,
          text:
            "<ul>" +
              "<li>Every entry has been opened and closed with '{' and '}' characters, respectively </li>" +
              "<li>The content from each attribute is enclosed with '{' and '}' or '\"' and '\"'</li>" +
              "<li>Assigning values is set by '='</li>" +
              "<li>Every entry must have an identification (citation key)</li>" +
            "</ul>",
          html: true
        });
        return;

      }

      let annotations = [], lineObjectType = "";
      ace.edit("formatter").setValue(this.get('formatter').get('bibtex').get('bibtex') || '');
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
      ace.edit("formatter").session.setAnnotations(annotations);
      // focus on first line with error
      let firstLineError = 0;
      if(this.get('formatter').get('bibtex').get('lines')[0]) {
        firstLineError = this.get('formatter').get('bibtex').get('lines')[0].line;
      }
      ace.edit("formatter").gotoLine(firstLineError);

      if (this.rangeLines.length > 0) {
        swal({
          title: 'We found errors in your bibtex file. Please, check that out before use it!'
        });
      } else {
        this.clearMarkers();
        swal({
          title: 'Congratulations! We didn\'t find errors in your bibtex file.',
        });
      }
    },

    buildEditor() {
      const bibtex = this.get('formatter').get('bibtex');
      // editor configuration
      ace.edit("formatter").getSession().setUseWrapMode(true);
      // bibtex content
      ace.edit("formatter").setValue(bibtex.get('bibtex') || '');
    },

    copyToClipboard() {
      const $tmp = Ember.$('<textarea>');
      Ember.$('body').append($tmp);
      $tmp.val(ace.edit("formatter").getSession().getValue()).select();
      document.execCommand('copy');
      $tmp.remove();

      swal({
      	title: 'Bibtex copied to clipboard!',
        timer: 2000
      });
    },

    save() {
      if(!!this.get('formatter').get('bibtex').get('bibtex')) {
        const file = new File([this.get('formatter').get('bibtex').get('bibtex')], "references-bibtex-normalizer.bib", {type: "text/plain;charset=utf-8"});
        saveAs(file);
      }
    },
  }
});
