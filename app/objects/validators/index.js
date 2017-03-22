import address from './address';
import author from './author';
import booktitle from './booktitle';
import edition from './edition';
import editor from './editor';
import journal from './journal';
import key from './key';
import note from './note';
import number from './number';
import organization from './organization';
import pages from './pages';
import publisher from './publisher';
import school from './school';
import series from './series';
import title from './title';
import volume from './volume';
import year from './year';

class Validator {
  constructor() {
    this.address = address;
    this.author = author;
    this.booktitle = booktitle;
    this.edition = edition;
    this.editor = editor;
    this.journal = journal;
    this.key = key;
    this.note = note;
    this.number = number;
    this.organization = organization;
    this.pages = pages;
    this.publisher = publisher;
    this.school = school;
    this.series = series;
    this.title = title;
    this.volume = volume;
    this.year = year;
  }

  getValidator(field) {
    return this[field];
  }
}

export default (new Validator());
