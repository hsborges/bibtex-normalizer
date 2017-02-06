import Ember from 'ember';

export default Ember.Controller.extend({
  formatter: Ember.inject.service(),

  init() {
    const prevent = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };

    Ember.$('html').on('dragover', function(event) {
      prevent(event);
      Ember.$('.drop-file-area').css('background-color', '#f0f0f0');
    });

    Ember.$('html').on('dragleave', function(event) {
      prevent(event);
      Ember.$('.drop-file-area').css('background-color', 'white');
    });
    // Ember.$('html').on('dragenter', prevent);
  },

  readAndRedirect() {
    const file = _.first(event.target.files || event.dataTransfer.files);

    if (!_.endsWith(file.name, '.bib')) {
      swal({
      	title: 'Must be a .bib file',
        timer: 2000
      });

      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      // no bibtex entries were detected
      if (this.get('formatter').get('bibtex').bibtex == null) {
        swal({
          title: "Your <small>.bib</small> file may be empty. Try upload it again",
          html: true,
          timer: 2000
        });
      }
      console.log(this.get('formatter').get('bibtex').bibtex);

      try {
        this.get('formatter').normalize(e.target.result);
      } catch (e) {
        swal({
        	title: "Your .bib file is incorrect, check one of the following:",
            text:
              "<ul>" +
                "<li>Every entry has been opened and closed with '{' and '}' characters, respectively </li>" +
                "<li>The content from each attribute is enclosed with '{' and '}' or '\"' and '\"'</li>" +
                "<li>Assigning values is set by '='</li>" +
              "</ul>"
            ,
            html: true,
          timer: 2000
        });
      } finally {
        this.transitionToRoute('bibtex');
      }
    };

    reader.readAsText(file);
  },

  actions: {
    choose() {
      Ember.$('.app-index .body .file-input').trigger('click');
    },
    select(event) {
      this.readAndRedirect(event);
    },
    drop(event) {
      event.preventDefault();
      event.stopPropagation();
      this.readAndRedirect(event);
    },
  }
});
