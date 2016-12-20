class PagesValidator {
  constructor() {
    // required fields
    this.field = 'pages';
    this.message = 'Valid formats are: 42-111 or 7,41,73-97 or 43+';
  }

  validate(value) {
    const pages = value.split(',').map(_.trim);
    const validPages = _.map(pages, page => /^(\d+|\d+-{1,2}\d+|\d+\+)$/.test(page));
    return _.reduce(validPages, (memo, curr) => (memo && curr), true);
  }
}

export default (new PagesValidator());
