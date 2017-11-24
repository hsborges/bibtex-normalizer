(function(exports) {
  exports.send = function (data) {
    console.log(data, exports, this);
  };
})(typeof exports === 'undefined' ? this['bnLogger'] = {} : exports);
