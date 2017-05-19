import Ember from 'ember';

export default Ember.Controller.extend({
  configuration: Ember.inject.service(),

  actions: {
    configure() {
      const config = this.get('configuration');
      const model = this.get('model');
      // iterate over the entries and save new config 
      _.each(model, (entry) => {
        const enabled = entry.enabled;
        const attributes = entry.attributes.filter(a => a.checked).map(a => a.name);
        config.update(entry.name, enabled, attributes);
      });
      // show alert
      swal({ title: 'Saved', type: 'success' });
    },

    restore() {
      const config = this.get('configuration');

      swal({
        title: 'Restore default config?',
        type: 'question',
        showConfirmButton: true,
        showCancelButton: true,
      })
      .then((confirm) => {
        if (!confirm) { return; }
        // restore default config
        config.setup(true);
        // force route to refresh model
        this.send('refreshModel');
        // show alert
        swal({ title: 'Saved', type: 'success' });
      });
    },
  }
});
