import title from './title';
import year from './year';
import author from './author';
import pages from './pages';
import booktitle from './booktitle';
import number from './number';

class Validator {
  constructor() {
    this.title = title;
    this.year = year;
    this.number = number;
    this.author = author;
    this.pages = pages;
    this.booktitle = booktitle;
  }

  getValidator(field) {
    return this[field];
  }
}

export default (new Validator());
