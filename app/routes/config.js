import Ember from 'ember';

export default Ember.Route.extend({
  formatter: Ember.inject.service(),
  configuration: Ember.inject.service(),

  model() {
    return this.get('configuration').bibtexEntries;
  },

  actions: {
    configure() {
      const config = this.get('configuration');
      const entries = config.bibtexEntries;

      for(let entry in entries) {
        const attributes = [].concat(entries[entry].required).concat(entries[entry].optional);

        const enabled = Ember.$(`#normalize-${entry}`).is(':checked');
        const normalize = [];

        for(let i = 0; i < attributes.length; i++) {
          let idOptional = `${entry}-${attributes[i]}`;

          if(Ember.$(`#input-${idOptional}`).is(':checked')) {
            normalize.push(attributes[i]);
          }
        }

        config.update(entry, enabled, normalize);
      }

      swal({
        title: 'Saved',
        type: 'success'
      });
    },

    // didTransition: to set as checked every attribute saved in cookie
    didTransition: function() {
      const config = this.get('configuration');

      Ember.run.schedule('afterRender', this, function() {
        // default config - 'normalize it' from entries
        _.forIn(config.bibtexEntries, (value, key) => {
          if(value.enabled) {
            Ember.$(`#normalize-${key}`).attr('checked', true);
          } else {
            Ember.$(`#normalize-${key}`).removeAttr('checked');
          }

          for(let i = 0; i < value.normalize.length; i++) {
            Ember.$(`#input-${key}-${value.normalize[i]}`).attr('checked', true);
          }
        });
      });
    }
  }
});
