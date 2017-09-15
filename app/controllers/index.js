import Ember from 'ember';

export default Ember.Controller.extend({
  formatter: Ember.inject.service(),
  sampleEntry: `@inproceedings{Borges2016,
  author = { Borges, Hudson and Hora, André C. and Valente, Marco Tulio },
  title = { Understanding the Factors That Impact the Popularity of GitHub Repositories},
  booktitle = { International Conference on Software Maintenance and Evolution (ICSME) },
  pages = { 334--344 },
  year = { 2016 },
  url = { https://doi.org/10.1109/ICSME.2016.31 },
  doi = { 10.1109/ICSME.2016.31 },
  timestamp = { Mon, 22 May 2017 17:11:00 +0200 }
}`,

  normalizedSampleEntry: `@inproceedings{Borges2016,
  author = { Hudson Borges and André C. Hora and Marco Tulio Valente },
  title = { Understanding the Factors That Impact the Popularity of {GitHub} Repositories },
  booktitle = { International Conference on Software Maintenance and Evolution (ICSME) },
  pages = { 334--344 },
  year = { 2016 }
}`,

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
    Ember.run.schedule("afterRender", this, function() {
      SyntaxHighlighter.defaults['gutter'] = false;
      SyntaxHighlighter.defaults['toolbar'] = false;
      SyntaxHighlighter.defaults['highlight'] = [];
      SyntaxHighlighter.all();
    });
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
    normalizeSample() {
      this.get('formatter').create(Ember.$('#sample-entry').val());
    }
  }
});
