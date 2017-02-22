class JournalValidator {
  constructor() { }

  validate(value) {
    return {
      isValid: /^\S/.test(value),
      message: 'Must consist of literals (a-z, A-Z).'
    };
  }
}

export default (new JournalValidator());
