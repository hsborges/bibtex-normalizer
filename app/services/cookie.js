import Ember from 'ember';

export default Ember.Service.extend({

  setCookie: function(attribute) {
    Cookies.set(attribute, true, {expires: 365});
  },

  getCookie: function(attribute) {
    return Cookies.get(attribute);
  },

  removeCookie: function(attribute) {
    Cookies.remove(attribute);
  }
});
