import Ember from 'ember';
import { Bibtex } from '../objects';

export default Ember.Service.extend({
  configuration: Ember.inject.service(),

  bibtex: Bibtex.create({}),

  create(bibtex) {
    const config = _.mapValues(this.get('configuration').bibtexEntries, 'normalize');
    this.set('bibtex', Bibtex.create({ bibtex: bibtex, config: config }));
    return this.get('bibtex');
  },
});
