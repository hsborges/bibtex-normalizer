import Ember from 'ember';

export default Ember.Route.extend({
  cookie: Ember.inject.service(),

  entriesObjects: {
    "article": {
      "required": ["author", "title", "journal", "year"],
      "optional": ["volume", "number", "pages", "month", "note", "key"]
    },
    "book": {
      "required": ["author", "editor", "title", "publisher", "year"],
      "optional": ["volume", "series", "address", "edition", "month", "note", "key"]
    },
    "booklet": {
      "required": ["title"],
      "optional": ["author", "howpublished", "address", "month", "year", "note", "key"]
    },
    "conference": {
      "required": ["author", "title", "booktitle", "year"],
      "optional": ["editor", "pages", "organization", "publisher", "address", "month", "note", "key"]
    },
    "inbook": {
      "required": ["author", "editor", "title", "chapter", "pages", "publisher", "year"],
      "optional": ["volume", "series", "address", "edition", "month", "note", "key"]
    },
    "incollection": {
      "required": ["author", "title", "booktitle", "year"],
      "optional": ["editor", "pages", "organization", "publisher", "address", "month", "note", "key"]
    },
    "inproceedings": {
      "required": ["author", "title", "booktitle", "year"],
      "optional": ["editor", "pages", "organization", "publisher", "address", "month", "note", "key"]
    },
    "manual": {
      "required": ["title"],
      "optional": ["author", "organization", "address", "edition", "month", "year", "note", "key"]
    },
    "masterthesis": {
      "required": ["author", "title", "school", "year"],
      "optional": ["address", "month", "note", "key"]
    },
    "misc": {
      "required": [],
      "optional": ["author", "title", "howpublished", "month", "year", "note", "key"]
    },
    "phdthesis": {
      "required": ["author", "title", "school", "year"],
      "optional": ["address", "month", "note", "key"]
    },
    "proceedings": {
      "required": ["title", "year"],
      "optional": ["editor", "publisher", "organization", "address", "month", "note", "key"]
    },
    "techreport": {
      "required": ["author", "title", "institution", "year"],
      "optional": ["type", "number", "address", "month", "note", "key"]
    },
    "unpublished": {
      "required": ["author", "title", "note"],
      "optional": ["month", "year", "key"]
    }
  },

  model() {
    return this.get('entriesObjects');
  },

  actions: {
    configure() {
      for(let entry in this.get('entriesObjects')) {

        if(Ember.$(`#normalize-${entry}`).is(':checked')) {
          let indexEntry = this.get('entriesObjects')[entry];
          let attrEntryArray = [];

          for(let i=0; i < indexEntry.optional.length; i++) {
            let idOptional = `${entry}-${indexEntry.optional[i]}`;

            if(Ember.$(`#input-${idOptional}`).is(':checked')) {
              attrEntryArray.push(indexEntry.optional[i]);
            } else {
              this.get('cookie').removeCookie(idOptional);
            }
          }

          this.get('cookie').setCookie(entry, attrEntryArray.concat(indexEntry.required));
        }else {
          this.get('cookie').removeCookie(entry);
        }

      }

      swal({
        title: 'Saved',
        type: 'success'
      });

    },

    // didTransition: to set as checked every attribute saved in cookie
    didTransition: function() {
      Ember.run.schedule("afterRender", this, function() {
        // default config - 'normalize it' from entries
        if(!!this.get('cookie').getAllCookie()) {
          for(let entry in this.get('entriesObjects')) {
            let indexEntry = this.get('entriesObjects')[entry];

            if(entry !== "misc") {
              this.get('cookie').setCookie(entry, indexEntry.required);
              Ember.$(`#normalize-${entry}`).attr('checked', true);
            }

          }
        }

        for(let entry in this.get('entriesObjects')) {
          let attrEntryArray = this.get('cookie').getCookie(entry);

          Ember.$(`#normalize-${entry}`).attr('checked', true);

          if(!attrEntryArray) {
            Ember.$(`#normalize-${entry}`).removeAttr('checked');
          }

          if(attrEntryArray) {
            for(let i=0; i<attrEntryArray.length; i++) {
              Ember.$(`#input-${entry}-${attrEntryArray[i]}`).attr('checked', true);
            }
          }

        }
      });
    }
  }
});
