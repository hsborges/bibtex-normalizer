class NoteValidator {
  constructor() { }

  validate(value) {
    return {
      isValid: /^\S[^MISSING]/.test(value),
      message: 'Must consist of literals (a-z, A-Z). Bibtex-normalizer default: MISSING'
    };
  }
}

export default (new NoteValidator());
