(function(exports) {
  exports.send = function (data) {
    console.log(exports);
    Ember.$.ajax({
        data: data,
        method: 'POST',
        url: exports.logging_url
      }).then((response) => {
        console.log(response);
      });
  };
})(typeof exports === 'undefined' ? this['bnLogger'] = {} : exports);
