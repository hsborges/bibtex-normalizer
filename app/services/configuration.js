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
      'default' : ['title', 'author', 'howpublished', 'year']
    },
    'conference': {
      'required': ['author', 'title', 'booktitle', 'year'],
      'optional': ['editor', 'pages', 'organization', 'publisher', 'address', 'month', 'note', 'key'],
      'default' : ['author', 'title', 'booktitle', 'year', 'pages']
    },
    'inbook': {
      'required': ['author', 'editor', 'title', 'chapter', 'pages', 'publisher', 'year'],
      'optional': ['volume', 'series', 'address', 'edition', 'month', 'note', 'key'],
      'default' : ['author', 'editor', 'title', 'chapter', 'pages', 'publisher', 'year']
    },
    'incollection': {
      'required': ['author', 'title', 'booktitle', 'year'],
      'optional': ['editor', 'pages', 'organization', 'publisher', 'address', 'month', 'note', 'key'],
      'default' : ['author', 'title', 'booktitle', 'year', 'pages', 'pages']
    },
    'inproceedings': {
      'required': ['author', 'title', 'booktitle', 'year'],
      'optional': ['editor', 'pages', 'organization', 'publisher', 'address', 'month', 'note', 'key'],
      'default' : ['author', 'title', 'booktitle', 'year', 'pages', 'pages']
    },
    'manual': {
      'required': ['title'],
      'optional': ['author', 'organization', 'address', 'edition', 'month', 'year', 'note', 'key'],
      'default' : ['title', 'author', 'year']
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
      'default' : ['author', 'title', 'note', 'year']
    }
  },

  userConfig: null,

  setup(restore = false) {
    const entries = this.get('bibtexEntries');
    const cookies = Cookies.getJSON();

    if (!cookies.config || restore) {
      _.forIn(entries, (value, key) => {
        Cookies.set(`bibtex.${key}`, { enabled: (key !== 'misc'), attributes: value.default }, { expires: 365 });
      });
      Cookies.set('config', { created_at: new Date(), version: '0.0.1' });
    }

    const config = Object.keys(entries)
      .reduce((memo, entry) => {
        memo[entry] = Cookies.getJSON(`bibtex.${entry}`);
        return memo;
      },  {});

    this.set('userConfig', config);
  },

  update(entry, enabled, attributes) {
    Cookies.set(`bibtex.${entry}`, (this.get('userConfig')[entry] = { enabled, attributes }));
  }
});
