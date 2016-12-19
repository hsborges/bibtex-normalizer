import Ember from 'ember';

export default Ember.Controller.extend({
  formatter: Ember.inject.service(),

  actions: {
    copyToClipboard() {
      const $tmp = Ember.$('<textarea>');
      Ember.$('body').append($tmp);
      $tmp.val(this.model.bibtex).select();
      document.execCommand('copy');
      $tmp.remove();

      swal({
      	title: 'Bibtex copied to clipboard!',
        timer: 2000
      });
    },
    save() {
      const file = new File([this.model.bibtex], "references.bib", {type: "text/plain;charset=utf-8"});
      saveAs(file);
    },
  }
});
