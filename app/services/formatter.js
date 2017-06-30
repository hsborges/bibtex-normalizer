import Ember from 'ember';
import { Bibtex } from '../objects';

export default Ember.Service.extend({
  configuration: Ember.inject.service(),

  bibtex: Bibtex.create({}),

  create(bibtex) {
    const config = this.get('configuration').userConfig;
    this.set('bibtex', Bibtex.create({ bibtex: bibtex, config: config }));
    return this.get('bibtex');
  },
});
