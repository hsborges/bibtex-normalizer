class BooktitleValidator {
  constructor() { }

  validate(value) {
    return {
      isValid: /^(\d+)(st|nd|rd|th) (.*?) \((.+)\)?$/i.test(_.trim(value)),
      message: 'Must follow the format [number]th [conference name] ([abbreviation]).'
    };
  }
}

export default (new BooktitleValidator());
