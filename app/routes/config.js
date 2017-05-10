import Ember from 'ember';

export default Ember.Route.extend({
  cookie: Ember.inject.service(),

  entriesObjects: {
    "article": {
      "enabled": true,
      "required": ["author", "title", "journal", "year"],
      "optional": ["volume", "number", "pages", "month", "note", "key"]
    },
    "book": {
      "enabled": true,
      "required": ["author", "editor", "title", "publisher", "year"],
      "optional": ["volume", "series", "address", "edition", "month", "note", "key"]
    },
    "booklet": {
      "enabled": true,
      "required": ["title"],
      "optional": ["author", "howpublished", "address", "month", "year", "note", "key"]
    },
    "conference": {
      "enabled": true,
      "required": ["author", "title", "booktitle", "year"],
      "optional": ["editor", "pages", "organization", "publisher", "address", "month", "note", "key"]
    },
    "inbook": {
      "enabled": true,
      "required": ["author", "editor", "title", "chapter", "pages", "publisher", "year"],
      "optional": ["volume", "series", "address", "edition", "month", "note", "key"]
    },
    "incollection": {
      "enabled": true,
      "required": ["author", "title", "booktitle", "year"],
      "optional": ["editor", "pages", "organization", "publisher", "address", "month", "note", "key"]
    },
    "inproceedings": {
      "enabled": true,
      "required": ["author", "title", "booktitle", "year"],
      "optional": ["editor", "pages", "organization", "publisher", "address", "month", "note", "key"]
    },
    "manual": {
      "enabled": true,
      "required": ["title"],
      "optional": ["author", "organization", "address", "edition", "month", "year", "note", "key"]
    },
    "masterthesis": {
      "enabled": true,
      "required": ["author", "title", "school", "year"],
      "optional": ["address", "month", "note", "key"]
    },
    "misc": {
      "enabled": false,
      "required": [],
      "optional": ["author", "title", "howpublished", "month", "year", "note", "key"]
    },
    "phdthesis": {
      "enabled": true,
      "required": ["author", "title", "school", "year"],
      "optional": ["address", "month", "note", "key"]
    },
    "proceedings": {
      "enabled": true,
      "required": ["title", "year"],
      "optional": ["editor", "publisher", "organization", "address", "month", "note", "key"]
    },
    "techreport": {
      "enabled": true,
      "required": ["author", "title", "institution", "year"],
      "optional": ["type", "number", "address", "month", "note", "key"]
    },
    "unpublished": {
      "enabled": true,
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

      console.log(this.get('cookie').getAllCookie());

      swal({
        title: 'Saved',
        type: 'success'
      });

    },

    // didTransition: to set as checked every attribute saved in cookie
    didTransition: function() {
      Ember.run.schedule("afterRender", this, function() {

        console.log(this.get('cookie').getAllCookie());

        for(let entry in this.get('entriesObjects')) {
          let attrEntryArray = this.get('cookie').getCookie(entry);

          if(attrEntryArray) {
            Ember.$(`#normalize-${entry}`).attr('checked', true);
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
