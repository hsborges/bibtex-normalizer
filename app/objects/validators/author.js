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
      let match = author.match(/(.+),(.+)/i);

      if (!match) { return author; }

      let firstName = _.trim(match[2]).split(' ');
      if(firstName[1] && !firstName[1][1]) {
        match[2] = `${firstName[0]} ${firstName[1][0]}.`;
      }

      if (match) { return `${_.trim(match[2])} ${_.trim(match[1])}`; }
      return author;
    });

    return _.join(authors2, ' and ');
  }
}

export default (new AuthorValidator());
