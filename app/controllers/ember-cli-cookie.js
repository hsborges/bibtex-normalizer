import Ember from 'ember';

export default Ember.Controller.extend({
  formatter: Ember.inject.service(),

  actions: {
    setAction: function(attribute, value) {
      this.cookie.setCookie(attribute, value);
    },

    getAction: function(attribute) {
      console.log(this.cookie.getCookie(attribute));
      return this.cookie.getCookie(attribute);
    },

    removeAction: function(attribute) {
      this.cookie.removeCookie(attribute);
    }
  }
});
