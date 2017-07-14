import Ember from 'ember';

export default Ember.Controller.extend({
  formatter: Ember.inject.service(),
  sampleInput: `@article{DBLP:journals/sosym/QueirozPVHAC17,
    author = {Rodrigo Queiroz and Leonardo Teixeira Passos and Marco Tulio Valente and Claus Hunsen and Sven Apel and Krzysztof Czarnecki},
    title = {The shape of feature code: an analysis of twenty C-preprocessor-based systems},
    journal = {Software and System Modeling},
    volume = {16},
    number = {1},
    pages = {77--96},
    year = {2017},
    url = {https://doi.org/10.1007/s10270-015-0483-z},
    doi = {10.1007/s10270-015-0483-z},
    timestamp = {Fri, 26 May 2017 22:52:21 +0200},
    biburl = {http://dblp.uni-trier.de/rec/bib/journals/sosym/QueirozPVHAC17},
    bibsource = {dblp computer science bibliography, http://dblp.org}
  }`,
  sampleOutput: `@article{DBLP:journals/sosym/QueirozPVHAC17,
    author = { Rodrigo Queiroz and Leonardo Teixeira Passos and Marco Tulio Valente and Claus Hunsen and Sven Apel and Krzysztof Czarnecki },
    title = { The shape of feature code: an analysis of twenty C-preprocessor-based systems },
    journal = { Software and System Modeling },
    year = { 2017 }
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
      if(Ember.$('#sample-entry').val().length > 1000) {
        swal({ title: '', type: 'warning', text: 'limit reached' });
      } else {
        this.get('formatter').create(this.get('sampleInput'));
      }
    }
  }
});
