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

  init() {
    Ember.run.schedule("afterRender", this, function() {
      for(let entry in this.get('entriesObjects')) {
        let attrEntryArray = this.get('cookie').getCookie(entry);

        if(attrEntryArray) {
          for(let i=0; i<attrEntryArray.length; i++) {
            $(`#input-${entry}-${attrEntryArray[i]}`).attr('checked', true);
          }
        }

      }
    });
  },

  actions: {
    configure() {
      for(let entry in this.get('entriesObjects')) {
        let indexEntry = this.get('entriesObjects')[entry];
        let attrEntryArray = [];

        for(let i=0; i < indexEntry.optional.length; i++) {
          let idOptional = `${entry}-${indexEntry.optional[i]}`;

          if($(`#input-${idOptional}`).is(':checked')) {
            attrEntryArray.push(indexEntry.optional[i]);
          } else {
            this.get('cookie').removeCookie(idOptional);
          }

        }

        this.get('cookie').setCookie(entry, attrEntryArray.concat(indexEntry.required));

      }

      swal({
        title: 'Saved',
        type: 'success'
      });

    }
  }
});
