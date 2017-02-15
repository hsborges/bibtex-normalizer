import Ember from 'ember';
import ace from 'ember-ace';

const acce = require('ember-ace');

export default Ember.Controller.extend({
  formatter: Ember.inject.service(),

  actions: {
    clear() {
      this.get('formatter').get('bibtex').clear();
    },
    normalize() {
      // textarea was empty
      if (this.get('formatter').get('bibtex').get('bibtex') === ""){
        swal({
          title: "Your entry is empty.",
          timer: 2000
        });

        return;
      }

      try {
        this.get('formatter').get('bibtex').normalize();

        // no bibtex entries were detected
        if (this.get('formatter').get('bibtex').get('bibtex') === ""){
          swal({
            title: "Your entry may not be on <small>bibtex</small> standard.",
            html: true,
            timer: 2000
          });

          return;
        }
      } catch (e) {
        console.log(JSON.stringify(this.get('formatter').get('bibtex').get('citationKeys')));

        swal({
        	title: "Your entry is incorrect, check one of the following:",
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

    },
    buildEditor() {
      this.get('formatter').setOption(fontSize, 40);
    }
  }
});
