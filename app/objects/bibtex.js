import Ember from 'ember';
import { Entry } from './index';

export default Ember.Object.extend({
  bibtex: null,
  config: null,

  invalidFields: null,
  missingFields: null,
  formattedFields: null,
  citationKeys: null,

  init() {
    if (this.get('bibtex')) { this.normalize(); }
  },

  clear() {
    this.set('bibtex', '');
    this.set('invalidFields', []);
    this.set('missingFields', []);
    this.set('formattedFields', []);
    this.set('citationKeys', []);
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
    let citationKeysLength = 0;

    _.each(json, (entry) => {
      const entryObject = Entry.create({ bibtex: bibtexParse.toBibtex([entry]) });

      entryObject.set('citationKey', entry.citationKey);


      entryObject.set('requiredFields', this.get('config')[_.toLower(entry.entryType)]);

      // switch (_.toLower(entry.entryType)) {
      //   case 'article':
      //     entryObject.set('requiredFields', this.get('config')['article']);
      //     break;
      //   case 'inproceedings':
      //   case 'conference':
      //     entryObject.set('requiredFields', this.get('config')['conference']);
      //     break;
      //   case 'book':
      //     entryObject.set('requiredFields', this.get('config')['book']);
      //     break;
      //   case 'phdthesis':
      //     entryObject.set('requiredFields', this.get('config')['phdthesis']);
      //     break;
      //   default:
      //     console.log('Unknown entry type: ', entry.entryType);
      // }

      entryObject.normalize();

      const errors = _.concat(entryObject.get('invalidFields'), entryObject.get('missingFields'), entryObject.get('formattedFields'));

      // for each missing field in each entry, an error is added
      _.each(errors, (err) => {
        err.citationKey = entry.citationKey;
        err.line += lines;
      });

      this.get('invalidFields').addObjects(entryObject.get('invalidFields'));
      this.get('missingFields').addObjects(entryObject.get('missingFields'));
      this.get('formattedFields').addObjects(entryObject.get('formattedFields'));
      this.get('citationKeys').addObject(entryObject.get('citationKey'));
      // each object is added to object. It's not added for the second time if it's the same citationKey
      if(this.get('citationKeys').length > citationKeysLength) {
        ++citationKeysLength;
      } else {
        throw {name: "DuplicatedKey", message: `Duplicated "${entryObject.get('citationKey')}" key.`};
      }

      output += `${entryObject.get('bibtex')}\n\n`;
      lines = _.split(output, '\n').length - 1;
    });

    this.set('bibtex', _.trim(output));

    return this;
  },
});
