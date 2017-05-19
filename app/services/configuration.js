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
    'online': {
      'required': ['author', 'title', 'url'],
      'optional': ['editor', 'data', 'subtitle', 'titleaddon', 'language', 'version', 'note', 'organization', 'date', 'month', 'year', 'addendum', 'pubstate', 'urldate'],
      'default' : ['author', 'title', 'url', 'urldate']
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
    const currentVersion = '0.1.0';
    const entries = this.get('bibtexEntries');
    const currentConfig = Cookies.getJSON('config');

    if (restore || !currentConfig || compareVersions('0.1.0', cookies.config.version)) {
      _.forIn(entries, (value, key) => {
          Cookies.set(`bibtex.${key}`, { enabled: (key !== 'misc'), attributes: value.default }, { expires: 365 });
      });

      Cookies.set('config', { created_at: new Date(), version: currentVersion }, { expires: 365 });
    }

    const cookies = Cookies.getJSON();

    if (compareVersions(currentVersion, cookies.config.version)) {
      const keys = ['config'];

      _.forIn(entries, (value, key) => {
        const entryKey = keys[keys.length] = `bibtex.${key}`;
        const currentConfig = cookies[entryKey];

        if (!currentConfig) {
          Cookies.set(entryKey, { enabled: (key !== 'misc'), attributes: value.default }, { expires: 365 });
        } else {
          const enabled = currentConfig.enabled;
          const attributes = _.uniq(currentConfig.attributes.concat(value.required));
          Cookies.set(entryKey, { enabled, attributes }, { expires: 365 });
        }
      });

      Cookies.set('config', { created_at: new Date(), version: currentVersion }, { expires: 365 });
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
