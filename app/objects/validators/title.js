class TitleValidator {
  constructor() {
    this.properNames = ['Android', 'GitHub', 'YouTube', 'Twitter', 'Facebook', 'API', 'Java', 'JavaScript', 'Ruby'];
  }

  validate(value) {
    let isValid = true;

    _.each(this.properNames, (word) => {
      // find word
      const found = value.toLowerCase().indexOf(_.toLower(word));
      // test if it is equals
      if (found >= 0 && value.substr(found, word.length) !== word) { isValid = false; return; }
      // test if it is between braces
      if (found >= 0 && value.indexOf(`{${word}}`) < 0) { isValid = false; return; }
    });

    return {
      isValid,
      message: 'Proper names must be between braces (e.g., {YouTube}, {Twitter}, and {Facebook})',
      alternative: isValid ? null : this.fix(value)
    };
  }

  fix(value) {
    _.each(this.properNames, (word) => {
      const found = value.toLowerCase().indexOf(_.toLower(word));
      if (found >= 0) { value = `${value.substr(0, found)}{${word}}${value.substr(found + word.length)}`; }
    });

    return value.replace(/\{+/, '{').replace(/\}+/, '}');
  }
}

export default (new TitleValidator());
