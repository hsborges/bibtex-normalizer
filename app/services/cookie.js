import Ember from 'ember';

export default Ember.Service.extend({

  setCookie: function(entry, attribute) {
    Cookies.set(entry, JSON.stringify(attribute), {expires: 365});
  },

  getCookie: function(attribute) {
    return Cookies.getJSON(attribute);
  },

  getCookieEntry: function(entry) {
    return Cookies.getJSON(entry);
  },

  removeCookie: function(attribute) {
    Cookies.remove(attribute);
  },

  removeCookieEntry: function(entry) {
    Cookies.remove(entry);
  },

  getAllCookie: function() {
    return Cookies.getJSON();
  }
});
