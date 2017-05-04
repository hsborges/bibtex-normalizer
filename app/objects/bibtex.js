import Ember from 'ember';
import { Entry } from './index';

export default Ember.Object.extend({
  bibtex: null,
  config: null,

  invalidFields: null,
  missingFields: null,
  formattedFields: null,

  duplicatedKeys: null,
  lines: null,

  clear() {
    this.set('bibtex', '');
    this.set('invalidFields', []);
    this.set('missingFields', []);
    this.set('formattedFields', []);
    this.set('duplicatedKeys', []);
    this.set('lines', []);
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

    const entries = _.groupBy(json, 'citationKey');
    const citationKeys = _.keys(entries);

    _.each(citationKeys, (key) => {
      const keyEntries = entries[key];
      const isDuplicated = (keyEntries.length > 1);

      _.each(keyEntries, (entry) => {
        const entryObject = Entry.create({ bibtex: bibtexParse.toBibtex([entry]) });

        entryObject.set('citationKey', entry.citationKey);
        entryObject.set('requiredFields', this.get('config')[_.toLower(entry.entryType)]);
        entryObject.normalize();

        const errors = _.concat(entryObject.get('invalidFields'), entryObject.get('missingFields'), entryObject.get('formattedFields'));

        // for each missing field in each entry, an error is added
        _.each(errors, (err) => {
          err.citationKey = entry.citationKey;
          err.line += lines;

          this.get('lines').addObject({
            line: err.line,
            type: err.type,
            message: `"${err.field}": ${err.message}`
          });
        });

        if (isDuplicated) {
          const duplicatedKeyError = {
            line: (lines + 1),
            type: 'duplicatedKey',
            message: `Duplicated citation key: ${key}`
          };

          this.get('lines').addObject(duplicatedKeyError);
          this.get('duplicatedKeys').addObject(duplicatedKeyError);
        }

        this.get('invalidFields').addObjects(entryObject.get('invalidFields'));
        this.get('missingFields').addObjects(entryObject.get('missingFields'));
        this.get('formattedFields').addObjects(entryObject.get('formattedFields'));

        output += `${entryObject.get('bibtex')}\n\n`;
        lines = _.split(output, '\n').length - 1;
      });

    });

    // whether there is a duplicated key
    if(this.get('duplicatedKeys').length > 0) {
      throw {
        name: "DuplicatedKey",
        duplicatedKeys: this.get('duplicatedKeys')
      };
    }

    this.set('bibtex', _.trim(output));

    return this;
  },
});
