class SchoolValidator {
  constructor() { }

  validate(value) {
    return {
      isValid: /^((?!MISSING)[\s\S])*$/.test(value),
      message: 'Must consist of literals (a-z, A-Z). Bibtex-normalizer default: MISSING'
    };
  }
}

export default (new SchoolValidator());
