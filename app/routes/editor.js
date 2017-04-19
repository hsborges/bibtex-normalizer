import Ember from 'ember';

export default Ember.Route.extend({
  formatter: Ember.inject.service(),

  model() {
    return this.get('formatter').get('bibtex');
  },

  actions: {
    didTransition: function() {
      Ember.run.schedule("afterRender", this, function() {
        if(!!this.get('formatter').get('bibtex').get('bibtex')) {
          this.controllerFor('editor').send('normalize');
        }
      });
    }
  }
});
