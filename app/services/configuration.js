import Ember from 'ember';

export default Ember.Service.extend({
  bibtexEntries: {
    'article': {
      'required': ['author', 'title', 'journal', 'year'],
      'optional': ['volume', 'number', 'pages', 'month', 'note', 'key'],
      'default' : ['author', 'title', 'journal', 'year', 'volume', 'number', 'pages']
    },
    'book': {
      'required': ['author', 'editor', 'title', 'publisher', 'year'],
      'optional': ['volume', 'series', 'address', 'edition', 'month', 'note', 'key'],
      'default' : ['author', 'editor', 'title', 'publisher', 'year']
    },
    'booklet': {
      'required': ['title'],
      'optional': ['author', 'howpublished', 'address', 'month', 'year', 'note', 'key'],
      'default' : ['title']
    },
    'conference': {
      'required': ['author', 'title', 'booktitle', 'year'],
      'optional': ['editor', 'pages', 'organization', 'publisher', 'address', 'month', 'note', 'key'],
      'default' : ['author', 'title', 'booktitle', 'year']
    },
    'inbook': {
      'required': ['author', 'editor', 'title', 'chapter', 'pages', 'publisher', 'year'],
      'optional': ['volume', 'series', 'address', 'edition', 'month', 'note', 'key'],
      'default' : ['author', 'editor', 'title', 'chapter', 'pages', 'publisher', 'year']
    },
    'incollection': {
      'required': ['author', 'title', 'booktitle', 'year'],
      'optional': ['editor', 'pages', 'organization', 'publisher', 'address', 'month', 'note', 'key'],
      'default' : ['author', 'title', 'booktitle', 'year']
    },
    'inproceedings': {
      'required': ['author', 'title', 'booktitle', 'year'],
      'optional': ['editor', 'pages', 'organization', 'publisher', 'address', 'month', 'note', 'key'],
      'default' : ['author', 'title', 'booktitle', 'year']
    },
    'manual': {
      'required': ['title'],
      'optional': ['author', 'organization', 'address', 'edition', 'month', 'year', 'note', 'key'],
      'default' : ['title']
    },
    'masterthesis': {
      'required': ['author', 'title', 'school', 'year'],
      'optional': ['address', 'month', 'note', 'key'],
      'default' : ['author', 'title', 'school', 'year']
    },
    'misc': {
      'required': [],
      'optional': ['author', 'title', 'howpublished', 'month', 'year', 'note', 'key'],
      'default' : []
    },
    'phdthesis': {
      'required': ['author', 'title', 'school', 'year'],
      'optional': ['address', 'month', 'note', 'key'],
      'default' : ['author', 'title', 'school', 'year']
    },
    'proceedings': {
      'required': ['title', 'year'],
      'optional': ['editor', 'publisher', 'organization', 'address', 'month', 'note', 'key'],
      'default' : ['title', 'year']
    },
    'techreport': {
      'required': ['author', 'title', 'institution', 'year'],
      'optional': ['type', 'number', 'address', 'month', 'note', 'key'],
      'default' : ['author', 'title', 'institution', 'year']
    },
    'unpublished': {
      'required': ['author', 'title', 'note'],
      'optional': ['month', 'year', 'key'],
      'default' : ['author', 'title', 'note']
    }
  },

  setup() {
    const entries = this.get('bibtexEntries');
    const cookies = Cookies.getJSON();

    if (!cookies.config) {
      _.forIn(entries, (value, key) => {
        value.enabled = (key !== 'misc');
        value.normalize = value.default;
        Cookies.set(`bibtex.${key}`, value);
      });

      Cookies.set('config', { created_at: new Date(), version: '0.0.1' });
    }

    const config = { };

    Object.keys(entries)
      .map((entry) => {
        const cookie = Cookies.getJSON(`bibtex.${entry}`);
        entries[entry].enabled = cookie.enabled;
        entries[entry].normalize = cookie.normalize;
      });
  },

  restore() {
    const entries = this.get('bibtexEntries');

    _.forIn(entries, (value, key) => {
      delete value.enabled;
      delete value.normalize;
      Cookies.remove(`bibtex.${key}`);
    });

    Cookies.remove('config');

    this.setup();
  },

  update(entry, enabled, normalize) {
    const entries = this.get('bibtexEntries');
    entries[entry].enabled = enabled;
    entries[entry].normalize = normalize;
    Cookies.set(`bibtex.${entry}`, entries[entry]);
  }
});
