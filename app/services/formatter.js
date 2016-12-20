import Ember from 'ember';

const camel = ['Android', 'GitHub', 'YouTube', 'Twitter', 'Facebook'];

const Entry = Ember.Object.extend({
  bibtex: null,
  invalidFields: null,
  missingFields: null,
  formattedFields: null,

  requiredFields: null,

  validators: [
    {
      field: 'title',
      validate: (value) => {
        let valid = true;
        let words = _.words(value);
        // test camel case words
        _.each(camel, (word, index) => {
          const found = _.findIndex(words, w => (_.toLower(w) === _.toLower(word)));
          if (found >= 0) { valid = false; }
        });

        return valid;
      },
      fix: (value) => {
        let words = _.words(value);
        let formatted = false;

        _.each(camel, (word, index) => {
          const found = _.findIndex(words, w => (_.toLower(w) === _.toLower(word)));
          if (found >= 0) { words[found] = `{${word}}`; formatted = true; }
        });

        return formatted? _.join(words, ' ') : null;
      },
      message: 'Use brackets to keep camel case words.',
    },
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
        const validAuthors = _.map(authors, (author) => {
          const match = author.match(/(\w+),([\w\s]+)/i);
          if (match) { return `${_.trim(match[2])} ${_.trim(match[1])}`; }
          return author;
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
    {
      field: 'booktitle',
      validate: value => /^(\d+)(st|nd|rd|th) (.*?) \((.+)\)?$/i.test(_.trim(value)),
      message: 'Format: [number]th [conference name] ([abbreviation]).',
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

const Bibtex = Ember.Object.extend({
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

export default Ember.Service.extend({
  bibtex: Bibtex.create({}),

  init() {
    this._super(...arguments);
  },

  normalize(bibtex) {
    this.set('bibtex', Bibtex.create({ bibtex: bibtex }));
    return this.get('bibtex');
  },
});
