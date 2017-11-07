import Ember from 'ember';

export default Ember.Controller.extend({
  configuration: Ember.inject.service(),

  actions: {
    configure() {
      const config = this.get('configuration');
      const model = this.get('model');
      // log payload
      const payload = [];
      // iterate over the entries and save new config
      _.each(model, (entry) => {
        const enabled = entry.enabled;
        const attributes = entry.attributes.filter(a => a.checked).map(a => a.name);
        config.update(entry.name, enabled, attributes);
        payload.push({ name: entry.name, enabled, attributes });
      });
      // log action
      Ember.$.ajax({
        data: { version: bnConfig.version, route: 'settings', action: 'save', date: new Date(), payload: payload },
        method: 'POST',
        url: bnConfig.logging_url
      });
      bnLogger.send({ version: bnConfig.version, route: 'settings', action: 'save', date: new Date(), payload });
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
        // log action
        bnLogger.send({ version: bnConfig.version, route: 'settings', action: 'restore', date: new Date() });
        // show alert
        swal({ title: 'Saved', type: 'success' });
      })
      .catch(() => null);
    },
  }
});
