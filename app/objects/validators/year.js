class YearValidator {
  constructor() {
    // required fields
    this.field = 'year';
    this.message = 'Year must consist of four numerals (e.g., 1999).';
  }

  validate(value) {
    return /^\d{4}/.test(value);
  }
}

export default (new YearValidator());
