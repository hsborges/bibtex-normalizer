import Ember from 'ember';

export default Ember.Route.extend({
  formatter: Ember.inject.service(),
  errors: null,

  beforeModel() {
    const f = this.get('formatter');

    if (!f.get('source')) {
      this.transitionTo('index');
    }
  },

  model() {
    const result = this.get('formatter').analyze();

    this.set('errors', result.marks);

    const totalErrors = result.total.errors - result.total.missing;

    result.alerts = [
      totalErrors ? {
        icon: 'exclamation-triangle',
        text: `${totalErrors} errors found.`,
        class: 'danger'
      } : null,
      result.total.missing ? {
        icon: 'plus',
        text: `${result.total.missing} missing fields added.`,
        class: 'danger'
      } : null,
      result.total.formatted ? {
        icon: 'pencil-square-o',
        text: `${result.total.formatted} fields auto-formatted`,
        class: 'warning',
      } : null,
    ];

    result.alerts = _.compact(result.alerts);

    result.marks = result.marks.join(', ');

    return result;
  },

  actions: {
    willTransition() {
      Ember.$('.app-header').removeClass('border-bottom');
      // Ember.$('.app-header .option.result').addClass('hide');
    },
    didTransition() {
      Ember.run.schedule("afterRender", this, function() {
        Ember.$('.app-header').addClass('border-bottom');
        // Ember.$('.app-header .option.result').removeClass('hide');
        SyntaxHighlighter.defaults["toolbar"] = false;
        SyntaxHighlighter.defaults["highlight"] = this.get('errors');
        SyntaxHighlighter.highlight();
      });
    },
  }
});
