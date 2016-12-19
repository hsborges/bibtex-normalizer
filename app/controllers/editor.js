import Ember from 'ember';

export default Ember.Controller.extend({
  formatter: Ember.inject.service(),

  actions: {
    clear() {
      this.get('formatter').get('bibtex').clear();
    },
    normalize() {
      this.get('formatter').get('bibtex').normalize();
      this.transitionToRoute('bibtex');
    }
  }
});
