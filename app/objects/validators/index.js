import addendum from './addendum';
import address from './address';
import author from './author';
import booktitle from './booktitle';
import data from './data';
import edition from './edition';
import editor from './editor';
import journal from './journal';
import key from './key';
import language from './language';
import month from './month';
import note from './note';
import number from './number';
import organization from './organization';
import pages from './pages';
import publisher from './publisher';
import pubstate from './pubstate';
import school from './school';
import series from './series';
import subtitle from './subtitle';
import title from './title';
import titleaddon from './titleaddon';
import url from './url';
import urldate from './urldate';
import version from './version';
import volume from './volume';
import year from './year';

class Validator {
  constructor() {
    this.addendum = addendum;
    this.address = address;
    this.author = author;
    this.booktitle = booktitle;
    this.data = data;
    this.edition = edition;
    this.editor = editor;
    this.journal = journal;
    this.key = key;
    this.language = language;
    this.month = month;
    this.note = note;
    this.number = number;
    this.organization = organization;
    this.pages = pages;
    this.publisher = publisher;
    this.pubstate = pubstate;
    this.school = school;
    this.series = series;
    this.subtitle = subtitle;
    this.title = title;
    this.titleaddon = titleaddon;
    this.url = url;
    this.urldate = urldate;
    this.version = version;
    this.volume = volume;
    this.year = year;
  }

  getValidator(field) {
    return this[field];
  }
}

export default (new Validator());
