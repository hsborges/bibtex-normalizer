import Ember from 'ember';

(function(exports) {
  exports.send = function (data) {
    Ember.$.post({
      url: exports.logging_url,
      data: data,
      dataType: 'json'
    });
  };
})(typeof exports === 'undefined' ? this['bnLogger'] = {} : exports);
