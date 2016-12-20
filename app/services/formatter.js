import Ember from 'ember';
import { Bibtex } from '../objects';

export default Ember.Service.extend({
  bibtex: Bibtex.create({}),

  init() {
    this._super(...arguments);
  },

  normalize(bibtex) {
    this.set('bibtex', Bibtex.create({ bibtex: bibtex }));
    return this.get('bibtex');
  },
});
