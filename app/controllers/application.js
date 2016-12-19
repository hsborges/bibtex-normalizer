import Ember from 'ember';

export default Ember.Controller.extend({
  formatter: Ember.inject.service(),

  index: Ember.computed('currentPath', function() {
    return this.get('currentPath') == 'index';
  }),

  editor: Ember.computed.equal('currentPath', 'editor'),
  about: Ember.computed.equal('currentPath', 'about'),

  actions: {
    copyToClipboard() {
      const formatter = this.get('formatter');
      const $tmp = Ember.$('<textarea>');
      Ember.$('body').append($tmp);
      $tmp.val(_.trim(formatter.get('bibtexStr') || '')).select();
      document.execCommand('copy');
      $tmp.remove();

      swal({
      	title: 'Bibtex copied to clipboard!',
        timer: 2000
      });
    },
    save() {
      const formatter = this.get('formatter');
      const file = new File([_.trim(formatter.get('bibtexStr'))], "references.bib", {type: "text/plain;charset=utf-8"});
      saveAs(file);
    },
  }
});
