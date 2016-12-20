import Ember from 'ember';
import validators from './validators';

export default Ember.Object.extend({
  bibtex: null,
  invalidFields: null,
  missingFields: null,
  formattedFields: null,

  requiredFields: null,

  validate(field, value, format) {
    const validator = validators.getValidator(_.toLower(field));

    let isValid = true;
    let alternative = null;
    let message = null;

    if (validator) {
      isValid = validator.validate(value);
      if (!isValid) { message = validator.message; }
      if (format && !isValid && validator.fix) {
        alternative = validator.fix(value);
        if (alternative) { isValid = true; }
      }
    }

    return { field, isValid, alternative, message };
  },

  normalize() {
    this.set('invalidFields', []);
    this.set('missingFields', []);
    this.set('formattedFields', []);

    const json = _.first(bibtexParse.toJSON(this.get('bibtex')));

    if (!json.entryType) { return this; }

    let requiredFields = this.get('requiredFields');
    if (requiredFields) { requiredFields = _.map(requiredFields, _.toLower); }

    let bibtex = `@${json.entryType}{${json.citationKey},\n`;
    let line = 1;

    _.forIn(json.entryTags, (value, key) => {
      if (requiredFields && !_.includes(requiredFields, _.toLower(key))) { return; }

      const validation = this.validate(key, value, true);
      line += 1;

      if (!validation.isValid && !validation.alternative) {
        this.get('invalidFields').addObject({ field: validation.field, line: line, message: validation.message });
      }

      if (validation.alternative) {
        this.get('formattedFields').addObject({ field: validation.field, line: line, message: validation.message });
      }

      bibtex += `  ${key} = { ${_.trim(validation.alternative || value)} },\n`;
    });

    const missingFields = _.differenceWith(requiredFields, _.chain(json.entryTags).keys().map(_.toLower).value());

    _.each(missingFields, (field) => {
      bibtex += `  ${field} = { XX },\n`;
      this.get('missingFields').addObject({ field: field, line: ++line, message: `"${field}" is a required field for @${json.entryType}.` });
    });

    bibtex += '}';

    this.set('bibtex', bibtex);

    return this;
  }
});
