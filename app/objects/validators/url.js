class UrlValidator {
  constructor() { }

  validate(value) {
    return {
      isValid: validator.isURL(value),
      message: 'Must consist of a valid URL.'
    };
  }
}

export default (new UrlValidator());
