class PagesValidator {
  constructor() { }

  validate(value) {
    const pages = value.split(',').map(_.trim);
    const validPages = _.map(pages, page => /^(\d+|\d+-{1,2}\d+|\d+\+)$/.test(page));
    const isValid = _.reduce(validPages, (memo, curr) => (memo && curr), true);

    return {
      isValid,
      message: 'Valid formats are: 42-111 or 7,41,73-97 or 43+',
      alternative: isValid ? null : this.fix(value),
    };
  }

  fix(value) {
    const pages = value.split(',').map(_.trim);

    let formatted = false;
    let valid = true;

    const validPages = _.map(pages, (page) => {
      const index = page.indexOf(' ');
      if (index >= 0) { page = page.replace(/\s/g, ''); formatted = true; }
      if (/^(\d+|\d+-{1,2}\d+|\d+\+)$/.test(page)) { return page; }
      else { valid = false; }
    });

    return valid && formatted ? _.join(validPages, ',') : false;
  }
}

export default (new PagesValidator());
