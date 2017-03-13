import Ember from 'ember';

export default Ember.Route.extend({
  formatter: Ember.inject.service(),
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

  actions: {
    configure() {
      for(let entry in this.get('entriesObjects')) {
        let indexEntry = this.get('entriesObjects')[entry];

        for(let i=0; i < indexEntry.optional.length; i++) {
          let idOptional = `#input-${entry}-${indexEntry.optional[i]}`;

          // comparsion is in string
          if(`${$(idOptional).is(':checked')}` === "true") {
            this.controllerFor('ember-cli-cookie').send('setAction', `${entry}-${indexEntry.optional[i]}`, true);
            console.log(this.controllerFor('ember-cli-cookie').send('getAction', `${entry}-${indexEntry.optional[i]}`));
          } else {
            this.controllerFor('ember-cli-cookie').send('removeAction', `${entry}-${indexEntry.optional[i]}`);
          }


        }

      }
    }
  }
});
