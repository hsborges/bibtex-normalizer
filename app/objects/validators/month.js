class MonthValidator {
  constructor() { }

  validate(value) {
    return {
      isValid: /^((?!MISSING)[\s\S])*$/.test(value),
      message: 'Must consist of literals (december|dec). Bibtex-normalizer default: MISSING'
    };
  }
}

export default (new MonthValidator());
