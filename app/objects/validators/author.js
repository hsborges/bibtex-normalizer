class AuthorValidator {
  constructor() { }

  validate(value) {
    const authors = value.split(' and ').map(_.trim);
    const validAuthors = _.map(authors, author => !/(\w+),([\w\s]+)/i.test(author));
    const isValid = _.reduce(validAuthors, (memo, curr) => (memo && curr), true);

    return {
      isValid,
      message: 'Autocorrection from "Last, First Middle" to "First Middle Last"',
      alternative: isValid ? null : this.fix(value)
    };
  }

  fix(value) {
    const authors = value.split(' and ').map(_.trim);

    const authors2 = _.map(authors, (author) => {
      const match = author.match(/(\w+),([\w\s]+)/i);
      if (match) { return `${_.trim(match[2])} ${_.trim(match[1])}`; }
      return author;
    });

    return _.join(authors2, ' and ');
  }
}

export default (new AuthorValidator());
