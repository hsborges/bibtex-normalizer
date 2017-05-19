class DataValidator {
  constructor() { }

  validate(value) {
    return {
      isValid: /^((?!MISSING)[\s\S])*$/.test(value),
      message: 'Must consist of literals (a-z, A-Z) and digits (0-9). Bibtex-normalizer default: MISSING'
    };
  }
}

export default (new DataValidator());
