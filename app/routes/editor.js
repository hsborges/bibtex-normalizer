import Ember from 'ember';

export default Ember.Route.extend({
  formatter: Ember.inject.service(),

  model() {
    return this.get('formatter').get('bibtex');
  }
});
