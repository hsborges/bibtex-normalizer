import Ember from 'ember';

export default Ember.Route.extend({
  cookie: Ember.inject.service('cookie'),

  entriesObjects: {
    "article": {
      "required": ["author", "title", "journal", "year"],
      "optional": ["volume", "number", "pages", "month", "note", "key"]
    },
    "book": {
      "required": ["author", "editor", "title", "publisher", "year"],
      "optional": ["volume", "series", "address", "edition", "month", "note", "key"]
    },
    "inproceedings": {
      "required": ["author", "title", "booktitle", "year"],
      "optional": ["editor", "pages", "organization", "publisher", "address", "month", "note", "key"]
    },
    "conference": {
      "required": ["author", "title", "booktitle", "year"],
      "optional": ["editor", "pages", "organization", "publisher", "address", "month", "note", "key"]
    }
  },

  model() {
    return this.get('entriesObjects');
  },

  init() {
    Ember.run.schedule("afterRender", this, function() {
      for(let entry in this.get('entriesObjects')) {
        let indexEntry = this.get('entriesObjects')[entry];

        for(let i=0; i < indexEntry.optional.length; i++) {
          let idOptional = `${entry}-${indexEntry.optional[i]}`;

          console.log(this.get('cookie').isCookie(idOptional));

          if(this.get('cookie').isCookie(idOptional)) {
            console.log(this.get('cookie').getCookie(idOptional));
            $(`#input-${idOptional}`).attr('checked', true);
          }

        }
      }
    });
  },

  actions: {
    configure() {
      for(let entry in this.get('entriesObjects')) {
        let indexEntry = this.get('entriesObjects')[entry];

        for(let i=0; i < indexEntry.optional.length; i++) {
          let idOptional = `${entry}-${indexEntry.optional[i]}`;

          try {
            console.log($(`#input-${idOptional}`).is(':checked'));
            if($(`#input-${idOptional}`).is(':checked') === "true") {
              this.get('cookie').setCookie(idOptional, true);
            } else {
              this.get('cookie').removeCookie(idOptional);
            }

          } catch (e) {
            swal({
              title: 'An unexpetced error',
              type: 'error'
            });
          }

          swal({
            title: 'Saved',
            type: 'success'
          });

        }

      }
    }
  }
});
