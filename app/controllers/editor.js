import Ember from 'ember';

export default Ember.Controller.extend({
  formatter: Ember.inject.service(),

  actions: {
    clear() {
      this.get('formatter').set('source', '');
    },
    normalize() {
      this.get('formatter').analyze();
      this.transitionToRoute('bibtex');
    }
  }
});
