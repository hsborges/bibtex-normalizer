class BooktitleValidator {
  constructor() { }

  validate(value) {
    return {
      isValid: /^(\d+)(st|nd|rd|th) (.*?) \((.+)\)?$/i.test(_.trim(value)),
      message: 'Layout must follow: [number][st|nd|rd|th] [conference name] ([abbreviation]).'
    };
  }
}

export default (new BooktitleValidator());
