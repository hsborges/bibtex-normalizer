import Ember from 'ember';

export default Ember.Controller.extend({
  configuration: Ember.inject.service(),

  index: Ember.computed.equal('currentPath', 'index'),
  editor: Ember.computed.equal('currentPath', 'editor'),
  about: Ember.computed.equal('currentPath', 'about'),
  config: Ember.computed.equal('currentPath', 'config'),

  init(){
    this._super(...arguments);
    this.get('configuration').setup();

    Ember.run.schedule("afterRender", this, function() {
      const self = this;
      Ember.$(window).on('scroll', function () {
        if(!self.get('index') && Ember.$(window).scrollTop()) {
          Ember.$('.app-header').addClass('app-header-fixed')
        } else {
          Ember.$('.app-header').removeClass('app-header-fixed')
        }
      });
    });
  }
});
