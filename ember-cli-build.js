/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    sassOptions: {
      includePaths: [
        'bower_components/bootstrap-sass/assets/stylesheets'
      ]
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // styles
  app.import('bower_components/font-awesome/scss/font-awesome.scss');
  app.import('bower_components/sweetalert2/dist/sweetalert2.css');
  // scripts
  app.import('bower_components/bootstrap-sass/assets/javascripts/bootstrap.js');
  app.import('bower_components/sweetalert2/dist/sweetalert2.min.js');
  app.import('bower_components/clipboard/dist/clipboard.min.js');
  app.import('bower_components/lodash/dist/lodash.min.js');
  app.import('bower_components/validator-js/validator.min.js');
  app.import('bower_components/js-cookie/src/js.cookie.js');
  app.import('bower_components/compare-versions/index.js');

  app.import('vendor/FileSaver.min.js');
  app.import('vendor/bibtexParse.js');
  // local scripts
  app.import({
    development: 'vendor/log/logging.development.js',
    production: 'vendor/log/logging.production.js',
  });
  app.import('vendor/log/config.js');

  return app.toTree();
};
