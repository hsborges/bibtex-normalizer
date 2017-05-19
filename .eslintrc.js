module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  rules: {
  },
  globals: {
    Cookies: true,
    _: true,
    swal: true,
    ace: true,
    bibtexParse: true,
    saveAs: true,
    validator: true,
    compareVersions: true
  }
};
