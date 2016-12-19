import Ember from 'ember';

const Entry = Ember.Object.extend({
  json: null,

  requiredFields: null,

  validators: [
    {
      field: 'year',
      validate: value => /^\d{4}/.test(value),
      message: 'Year must consist of four numerals, such as 1999.',
    },
    {
      field: 'author',
      validate: (value) => {
        const authors = value.split(' and ');
        const validAuthors = _.map(authors, author => !/(\w+),([\w\s]+)/i.test(author));
        return _.reduce(validAuthors, (memo, curr) => (memo && curr), true);
      },
      fix: (value) => {
        const authors = value.split(' and ').map(_.trim);
        const validAuthors = _.map(authors, author => {
          const match = author.match(/(\w+),([\w\s]+)/i);
          return `${_.trim(match[2])} ${_.trim(match[1])}`;
        });
        return _.join(validAuthors, ' and ');
      },
      message: 'Prefer names as is. For example, "Hudson Silva Borges" instead "Borges, Hudson Silva"',
    },
    {
      field: 'pages',
      validate: (value) => {
        const pages = value.split(',').map(_.trim);
        const validPages = _.map(pages, page => /^(\d+|\d+-{1,2}\d+|\d+\+)$/.test(page));
        return _.reduce(validPages, (memo, curr) => (memo && curr), true);
      },
      message: 'Valid formats for "pages": 42-111 or 7,41,73-97 or 43+',
    },
  ],

  validate(field, value, format) {
    const validator = _.find(this.get('validators'), ['field', _.toLower(field)]);

    let isValid = true;
    let alternative = null;
    let message = null;

    if (validator) {
      isValid = validator.validate(value);
      if (!isValid) { message = validator.message; }
      if (format && !isValid && validator.fix) {
        alternative = validator.fix(value);
        isValid = true;
      }
    }

    return { field, isValid, alternative, message };
  },

  toString() {
    const json = this.get('json');

    if (!json.entryType) {
      return null;
    }

    let requiredFields = this.get('requiredFields');
    if (requiredFields) { requiredFields = _.map(requiredFields, _.toLower); }

    const errors = [];
    const missing = [];
    const formatted = [];

    let bibtex = `@${json.entryType}{${json.citationKey},\n`;
    let line = 0;

    _.forIn(json.entryTags, (value, key) => {
      if (requiredFields && !_.includes(requiredFields, _.toLower(key))) {
        return;
      }

      const valid = this.validate(key, value, true);
      line += 1;

      if (!valid.isValid) { errors.push(line); }
      if (valid.alternative) { formatted.push(key); }

      bibtex += `  ${key} = { ${_.trim(valid.alternative || value)} },\n`;
    });

    const missingFields = _.differenceWith(requiredFields, _.chain(json.entryTags).keys().map(_.toLower).value());

    _.each(missingFields, (field) => {
      bibtex += `  ${field} = { XX },\n`;
      errors.push(++line);
      missing.push(field);
    });

    bibtex += '}';

    return {bibtex, errors, missing, formatted};
  }
});

const Bibtex = Ember.Object.extend({
  text: null,
  json: null,
  invalidFields: null,
  missingFields: null,
  formattedFields: null,

  init() {
    this.normalize();
  },

  normalize() {
    const text = this.get('text');

    const json = bibtexParse.toJSON(text);

    _.each(json, (entry) => {
      const entryObject = Entry.create({ json: entry });

      switch (_.toLower(entry.entryType)) {
        case 'article':
          entryObject.set('requiredFields', ['author', 'title', 'journal', 'year']);
          break;
        case 'inproceedings':
        case 'conference':
          entryObject.set('requiredFields', ['author', 'title', 'booktitle', 'year']);
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
    });

    this.set('text', this.toString()); //TODO
    this.set('json', null); //TODO
    this.set('invalidFields', null); //TODO
    this.set('missingFields', null); //TODO
    this.set('formattedFields', null); //TODO
  },

  toString() {
    return ''; //TODO
  },
});

export default Ember.Service.extend({
  source: null,
  json: null,

  result: null,

  init() {
    this._super(...arguments);
  },

  analyze() {
    const source = this.get('source');

    if (!source) {
      this.set('json', null);
      this.set('output', null);
      return null;
    }

    const json = bibtexParse.toJSON(source);
    this.set('json', json);

    let output = {
      bibtex: '',
      marks: [],
      total: {
        missing: 0,
        formatted: 0,
        errors: 0
      }
    };

    _.each(json, (entry) => {
      const entryObject = Entry.create({ json: entry });

      switch (_.toLower(entry.entryType)) {
        case 'article':
          entryObject.set('requiredFields', ['author', 'title', 'journal', 'year']);
          break;
        case 'inproceedings':
        case 'conference':
          entryObject.set('requiredFields', ['author', 'title', 'booktitle', 'year']);
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

      const result = entryObject.toString();
      const bibtexStrLines = output.bibtex.split('\n').length;

      output.marks = _.concat(output.marks, _.map(result.errors, e => (e+bibtexStrLines)));
      output.total.errors += result.errors.length;
      output.total.missing += result.missing.length;
      output.total.formatted += result.formatted.length;

      output.bibtex += `\n\n${result.bibtex}`;
    });

    output.bibtex = _.trim(output.bibtex);

    this.set('source', output.bibtex);
    this.set('result', output);

    return output;
  },
});
