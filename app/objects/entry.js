import Ember from 'ember';
import validators from './validators';

export default Ember.Object.extend({
  bibtex: null,
  invalidFields: null,
  missingFields: null,
  formattedFields: null,

  requiredFields: null,
  citationKeys: null,

  validate(field, value) {
    const validator = validators.getValidator(_.toLower(field));

    if (validator) {
      const result = validator.validate(value);
      return {
        field,
        isValid: result.isValid,
        alternative: result.alternative,
        message: result.message
      };
    } else {
      return {
        field,
        isValid: true,
        alternative: null,
        message: null
      };
    }
  },

  normalize() {
    this.set('invalidFields', []);
    this.set('missingFields', []);
    this.set('formattedFields', []);
    this.set('citationKeys', []);

    const json = _.first(bibtexParse.toJSON(this.get('bibtex')));

    if (!json.entryType) { return this; }

    let requiredFields = this.get('requiredFields');
    if (requiredFields) { requiredFields = _.map(requiredFields, _.toLower); }

    let bibtex = `@${json.entryType}{${json.citationKey},\n`;
    let line = 1;

    _.forIn(json.entryTags, (value, key) => {
      if (requiredFields && !_.includes(requiredFields, _.toLower(key))) { return; }

      value = value.replace(/\s+/g, ' ');

      const validation = this.validate(key, value);
      line += 1;

      if (!validation.isValid && !validation.alternative) {
        this.get('invalidFields').addObject({ field: validation.field, line: line, message: validation.message, type: 'invalidField' });
      }

      if (validation.alternative) {
        this.get('formattedFields').addObject({ field: validation.field, line: line, message: validation.message, type: 'formattedField' });
      }
      // Adding entry name in Entry object
      this.get('citationKeys').addObject(json.citationKey);

      bibtex += `  ${key} = { ${_.trim(validation.alternative || value)} },\n`;
    });

    const missingFields = _.differenceWith(requiredFields, _.chain(json.entryTags).keys().map(_.toLower).value());

    _.each(missingFields, (field) => {
      bibtex += `  ${field} = { MISSING },\n`;
      this.get('missingFields').addObject({ field: field, line: ++line, message: `required field for @${json.entryType}.`, type: 'missingField' });
    });

    //remove last comma from last attribute
    bibtex = `${bibtex.substr(0, bibtex.length-2)}\n}`;

    this.set('bibtex', bibtex);

    return this;
  }
});
