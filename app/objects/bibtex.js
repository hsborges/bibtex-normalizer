import Ember from 'ember';
import { Entry } from './index';

export default Ember.Object.extend({
  bibtex: null,
  invalidFields: null,
  missingFields: null,
  formattedFields: null,

  init() {
    if (this.get('bibtex')) { this.normalize(); }
  },

  clear() {
    this.set('bibtex', '');
    this.set('invalidFields', []);
    this.set('missingFields', []);
    this.set('formattedFields', []);
  },

  normalize() {
    let bibtex = this.get('bibtex');
    const missingFields = this.get('missingFields');

    if (missingFields && missingFields.length) {
      let tokens = _.split(bibtex, '\n');
      const removeLines = _.map(missingFields, (mf) => (mf.line - 1));
      tokens = _.map(tokens, (t, i) => (_.includes(removeLines, i) ? null : t));
      bibtex = _.join(tokens, '\n');
    }

    // parse bibtex file
    const json = bibtexParse.toJSON(bibtex);
    // reset fields
    this.clear();

    let lines = 0;
    let output = '';

    _.each(json, (entry) => {
      const entryObject = Entry.create({ bibtex: bibtexParse.toBibtex([entry]) });

      switch (_.toLower(entry.entryType)) {
        case 'article':
          entryObject.set('requiredFields', ['author', 'title', 'journal', 'volume', 'number', 'pages', 'year']);
          break;
        case 'inproceedings':
        case 'conference':
          entryObject.set('requiredFields', ['author', 'title', 'booktitle', 'pages', 'year']);
          break;
        case 'book':
          entryObject.set('requiredFields', ['author', 'editor', 'title', 'publisher', 'year']);
          break;
        case 'phdthesis':
          entryObject.set('requiredFields', ['author', 'title', 'school', 'year']);
          break;
        default:
          console.log('Unknown entry type: ', entry.entryType);
      }

      entryObject.normalize();

      const errors = _.concat(entryObject.get('invalidFields'), entryObject.get('missingFields'), entryObject.get('formattedFields'));

      _.each(errors, (err) => {
        err.citationKey = entry.citationKey;
        err.line += lines;
      });

      this.get('invalidFields').addObjects(entryObject.get('invalidFields'));
      this.get('missingFields').addObjects(entryObject.get('missingFields'));
      this.get('formattedFields').addObjects(entryObject.get('formattedFields'));

      output += `${entryObject.get('bibtex')}\n\n`;
      lines = _.split(output, '\n').length - 1;
    });

    this.set('bibtex', _.trim(output));

    return this;
  },
});
