class YearValidator {
  constructor() { }

  validate(value) {
    return {
      isValid: /^\d{4}/.test(value),
      message: 'Must consist of four numerals (e.g., 1999).'
    };
  }
}

export default (new YearValidator());
