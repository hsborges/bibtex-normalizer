class BooktitleValidator {
  constructor() {
    // required fields
    this.field = 'booktitle';
    this.message = 'Format: [number]th [conference name] ([abbreviation]).';
  }

  validate(value) {
    return /^(\d+)(st|nd|rd|th) (.*?) \((.+)\)?$/i.test(_.trim(value));
  }
}

export default (new BooktitleValidator());
