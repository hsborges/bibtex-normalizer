import Ember from 'ember';

export default Ember.Route.extend({
  formatter: Ember.inject.service(),

  model() {
    const entriesObjects = {
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
    };
    return entriesObjects;
  },

  actions: {
    configure() {
      console.log(Ember.$('.article').get('checked'));
    }
  }
});
