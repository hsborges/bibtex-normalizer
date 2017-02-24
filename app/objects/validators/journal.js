class JournalValidator {
  constructor() { }

  validate(value) {
    return {
      isValid: /^\S[^XX]/.test(value),
      message: 'Must consist of literals (a-z, A-Z). Bibtex-normalizer default: XX'
    };
  }
}

export default (new JournalValidator());
