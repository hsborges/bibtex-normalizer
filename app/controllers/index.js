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
      this.get('formatter').create(e.target.result);
      this.transitionToRoute('editor');
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
