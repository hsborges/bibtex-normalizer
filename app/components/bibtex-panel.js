import Ember from 'ember';

export default Ember.Component.extend({
  model: null,

  markInvalid: Ember.computed('model', function(){ return !!_.get(this.get('model'), 'invalidFields', []).length; }),
  markMissing: Ember.computed('model', function(){ return !!_.get(this.get('model'), 'missingFields', []).length; }),
  markFormatted: false,

  didRender() {
    const model = this.get('model');

    let errors = [];
    if (this.get('markInvalid')) { errors = _.concat(errors, model.invalidFields); }
    if (this.get('markMissing')) { errors = _.concat(errors, model.missingFields); }
    if (this.get('markFormatted')) { errors = _.concat(errors, model.formattedFields); }

    const pre = Ember.$('<pre id="bibtex-code" class="brush: bibtex"></pre>');
    pre.html(model.bibtex);
    Ember.$('#bibtex-panel').html(pre);

    SyntaxHighlighter.defaults["toolbar"] = false;
    SyntaxHighlighter.defaults["highlight"] = _.map(errors, 'line');
    SyntaxHighlighter.highlight();
  },
});
