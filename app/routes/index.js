import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    didTransition: function() {
      Ember.run.schedule("afterRender", this, function() {
        Ember.$("footer").show();
      });
    }
  }

});
