import Ember from 'ember';
import { Bibtex } from '../objects';

export default Ember.Service.extend({
  bibtex: Bibtex.create({}),

  init() {
    this._super(...arguments);
  },

  normalize(bibtex, config) {
    this.set('bibtex', Bibtex.create({ bibtex: bibtex, config: config }));
    return this.get('bibtex');
  },
});
