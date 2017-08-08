import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    willTransition: function() {
      Ember.$(window).scrollTop(0);
    }
  }
});
