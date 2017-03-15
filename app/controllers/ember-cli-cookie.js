import Ember from 'ember';

export default Ember.Controller.extend({
  formatter: Ember.inject.service(),
  preConfigStatus: null,

  actions: {
    setAction: function(attribute, value) {
      this.cookie.setCookie(attribute, value);
    },

    getInCookie: function(attribute) {
      this.attrStatus = this.cookie.getCookie(attribute);
      console.log(`${attribute}: ${this.attrStatus}`);
    },

    removeAction: function(attribute) {
      this.cookie.removeCookie(attribute);
    },

    findInCookie: function(attribute) {
      if(this.cookie.getCookie(attribute))
        this.preConfigStatus = true;
      else
        this.preConfigStatus = false;
    }
  }
});
