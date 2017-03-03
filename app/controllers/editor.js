import Ember from 'ember';

export default Ember.Controller.extend({
  formatter: Ember.inject.service(),

  actions: {
    clear() {
      ace.edit("formatter").setValue("");
      this.get('formatter').get('bibtex').clear();
    },
    normalize() {
      const input = ace.edit("formatter").getValue();
      // textarea was empty
      if (input === ""){
        swal({
          title: "Your entry is empty.",
          timer: 2000
        });

        return;
      }

      try {
        this.get('formatter').normalize(input);

        // no bibtex entries were detected
        if (this.get('formatter').get('bibtex').get('bibtex') === ""){
          swal({
            title: "Your entry may not be on <small>bibtex</small> standard.",
            html: true
          });

          return;
        }
      } catch (errorMessage) {
        // Check whether the exception came from duplicated citation key
        if(errorMessage.name === "DuplicatedKey") {
          swal({
            title: "Your <small>.bib</small> file has at least one duplicated citation key!",
            text: errorMessage.message,
            html: true
          });
        } else {
          swal({
          	title: "Your entry is incorrect, check one of the following:",
            text:
              "<ul>" +
                "<li>Every entry has been opened and closed with '{' and '}' characters, respectively </li>" +
                "<li>The content from each attribute is enclosed with '{' and '}' or '\"' and '\"'</li>" +
                "<li>Assigning values is set by '='</li>" +
                "<li>Every entry must have an identification (citation key)</li>" +
              "</ul>",
            html: true
          });
        }

        return;
      }

      this.transitionToRoute('bibtex');

    },
    buildEditor() {
      const bibtex = this.get('formatter').get('bibtex');
      ace.edit("formatter").setValue(bibtex.get('bibtex') || '');
    }
  }
});
