(function(exports) {
  exports.send = function (data) {
    console.log(data, exports);
  };
})(typeof exports === 'undefined' ? this['bnLogger'] = {} : exports);
