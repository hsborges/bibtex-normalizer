class UrlDateValidator {
  constructor() { }

  validate(value) {
    return {
      isValid: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value.trim()),
      message: 'Must consist of the following format: YYYY-MM-DD.'
    };
  }
}

export default (new UrlDateValidator());
