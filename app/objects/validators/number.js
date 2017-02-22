class NumberValidator {
  constructor() { }

  validate(value) {
    return {
      isValid: /^\d+$/.test(value),
      message: 'Must consist of numerals (e.g., 99).'
    };
  }
}

export default (new NumberValidator());
