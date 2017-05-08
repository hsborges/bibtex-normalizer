import Ember from 'ember';

export default Ember.Route.extend({
  formatter: Ember.inject.service(),

  model() {
    return this.get('formatter').get('bibtex');
  },

  actions: {
    didTransition: function() {
      Ember.run.schedule("afterRender", this, function() {
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/textmate");
        editor.session.setMode("ace/mode/latex");
        editor.setOptions({ minLines: 30, maxLines: 50 });
        editor.getSession().setTabSize(2);
        editor.getSession().setUseSoftTabs(true);
        editor.setHighlightActiveLine(false);

        if(!!this.get('formatter').get('bibtex').get('bibtex')) {
          this.controllerFor('editor').send('buildEditor');
          this.controllerFor('editor').send('normalize');
        }
      });
    }
  }
});
