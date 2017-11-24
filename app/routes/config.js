import Ember from 'ember';

export default Ember.Route.extend({
  formatter: Ember.inject.service(),
  configuration: Ember.inject.service(),

  model() {
    const config = this.get('configuration');
    const validators = config.bibtexAttributesValidator;

    if (!config.userConfig) { config.setup(); }

    return _.map(config.userConfig, (value, key) => {
      const bibtex = config.bibtexEntries[key];
      const attrs = []
        .concat(bibtex.required.map(a => ({ name: a, required: true, checked: true, validator: validators[a] })))
        .concat(bibtex.optional.map(a => ({ name: a, required: false, checked: value ? value.attributes.indexOf(a) >= 0 : '', validator: validators[a] })));

      return {
        name: key,
        enabled: value ? value.enabled : (key !== 'misc'),
        attributes: attrs,
      };
    });
  },

  actions: {
    refreshModel() {
      this.refresh();
    },

    didTransition: function() {
      Ember.run.schedule("afterRender", this, function() {
        Ember.$("footer").hide();
      });
    }
  }
});
