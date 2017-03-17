import Ember from 'ember';

export default Ember.Service.extend({

  setCookie: function(attribute, value) {
    this.cookie.setCookie(attribute, value);
  },

  getCookie: function(attribute) {
    return this.cookie.getCookie(attribute);
  },

  isCookie: function(attribute) {
    if(this.cookie.getCookie(attribute)) {
      return true;
    }
    return false;
  },

  removeCookie: function(attribute) {
    this.cookie.removeCookie(attribute);
  }
});
