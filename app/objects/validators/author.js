class AuthorValidator {
  constructor() {
    // required fields
    this.field = 'author';
    this.message = 'Prefer names as is.';
  }

  validate(value) {
    const authors = value.split(' and ');
    const validAuthors = _.map(authors, author => !/(\w+),([\w\s]+)/i.test(author));
    return _.reduce(validAuthors, (memo, curr) => (memo && curr), true);
  }

  fix(value) {
    const authors = value.split(' and ').map(_.trim);
    const validAuthors = _.map(authors, (author) => {
      const match = author.match(/(\w+),([\w\s]+)/i);
      if (match) { return `${_.trim(match[2])} ${_.trim(match[1])}`; }
      return author;
    });
    return _.join(validAuthors, ' and ');
  }
}

export default (new AuthorValidator());
