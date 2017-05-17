import Ember from 'ember';

export default Ember.Controller.extend({
  formatter: Ember.inject.service(),
  configuration: Ember.inject.service(),

  index: Ember.computed('currentPath', function() {
    return this.get('currentPath') === 'index';
  }),

  editor: Ember.computed.equal('currentPath', 'editor'),
  about: Ember.computed.equal('currentPath', 'about'),
  config: Ember.computed.equal('currentPath', 'config'),

  init(){
    this._super(...arguments);
    this.get('configuration').setup();
  }
});
