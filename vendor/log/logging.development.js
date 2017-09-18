(function(exports) {
  exports.send = function (data) {
    console.log(data);
  };
})(typeof exports === 'undefined' ? this['bnLogger'] = {} : exports);
