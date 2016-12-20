class PagesValidator {
  constructor() { }

  validate(value) {
    const pages = value.split(',').map(_.trim);
    const validPages = _.map(pages, page => /^(\d+|\d+-{1,2}\d+|\d+\+)$/.test(page));

    return {
      isValid: _.reduce(validPages, (memo, curr) => (memo && curr), true),
      message: 'Valid formats are: 42-111 or 7,41,73-97 or 43+'
    };
  }
}

export default (new PagesValidator());
