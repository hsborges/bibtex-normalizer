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

  // firefox requires event as a parameter to get uploaded file
  readAndRedirect(event) {
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
      try {
        this.get('formatter').normalize(e.target.result);

        // First attempt: Check the file out of Bibtex standards (or empty)
        if (this.get('formatter').get('bibtex').get('bibtex')) {
          this.transitionToRoute('bibtex');
        } else {
          swal({
            title: "Your entry may not be on <small>bibtex</small> standard.",
            html: true
          });
        }

      // Second attempt: Bibtex file incorrect
      } catch (errorMessage) {
        // Check whether the exception came from duplicated citation key
        if(errorMessage.name === "DuplicatedKey") {
          swal({
            title: "Your <small>.bib</small> file has at least one duplicated citation key!",
            text: errorMessage.message,
            html: true
          });
        } else {
          swal({
          	title: "Your <small>.bib</small> file is incorrect, check one of the following:",
            text:
              "<ul>" +
                "<li>Every entry has been opened and closed with '{' and '}' characters, respectively </li>" +
                "<li>The content from each attribute is enclosed with '{' and '}' or '\"' and '\"'</li>" +
                "<li>Assigning values is set by '='</li>" +
              "</ul>",
            html: true
          });
        }
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
      // slow and deprecated for Ember 1.x
      Ember.$('.app-index .body .file-input').val("");
    },
    drop(event) {
      event.preventDefault();
      event.stopPropagation();
      this.readAndRedirect(event);
    },
  }
});
