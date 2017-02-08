import Ember from 'ember';

export default Ember.Controller.extend({
  formatter: Ember.inject.service(),

  actions: {
    clear() {
      this.get('formatter').get('bibtex').clear();
    },
    normalize() {
      // no bibtex entries were detected
      if (this.get('formatter').get('bibtex')){
        swal({
          title: "Your content may not be on <small>bibtex</small> standard. Please, try again.",
          html: true,
          timer: 2000
        });
      }
      console.log(this.get('formatter').get('bibtex'));

      try {
        this.get('formatter').get('bibtex').normalize();
      } catch (e) {
        swal({
        	title: "Your .bib file is incorrect, check one of the following:",
          text:
            "<ul>" +
              "<li>Every entry has been opened and closed with '{' and '}' characters, respectively </li>" +
              "<li>The content from each attribute is enclosed with '{' and '}' or '\"' and '\"'</li>" +
              "<li>Assigning values is set by '='</li>" +
            "</ul>",
          html: true,
          timer: 2000
        });
      } finally {
        this.transitionToRoute('bibtex');
      }
    }
  }
});
