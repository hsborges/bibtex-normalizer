import author from './author';
import booktitle from './booktitle';
import editor from './editor';
import journal from './journal';
import number from './number';
import pages from './pages';
import publisher from './publisher';
import school from './school';
import title from './title';
import volume from './volume';
import year from './year';

class Validator {
  constructor() {
    this.author = author;
    this.booktitle = booktitle;
    this.editor = editor;
    this.journal = journal;
    this.number = number;
    this.pages = pages;
    this.publisher = publisher;
    this.school = school;
    this.title = title;
    this.volume = volume;
    this.year = year;
  }

  getValidator(field) {
    return this[field];
  }
}

export default (new Validator());
