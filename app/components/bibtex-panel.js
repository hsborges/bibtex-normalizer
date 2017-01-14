import Ember from 'ember';

export default Ember.Component.extend({
  model: null,

  markInvalid: Ember.computed('model', function(){ return !!_.get(this.get('model'), 'invalidFields', []).length; }),
  markMissing: Ember.computed('model', function(){ return !!_.get(this.get('model'), 'missingFields', []).length; }),
  markFormatted: false,

  markInvalidWatch: function(){ this.send('showInvalidDetails', this.get('markInvalid')); }.observes('markInvalid'),
  markMissingWatch: function(){ this.send('showMissingDetails', this.get('markMissing')); }.observes('markMissing'),
  markFormattedWatch: function(){ this.send('showFormattedDetails', this.get('markFormatted')); }.observes('markFormatted'),

  showInvalidDetails: false,
  showMissingDetails: false,
  showFormattedDetails: false,
  showDetails: Ember.computed.or('showInvalidDetails', 'showMissingDetails', 'showFormattedDetails'),
  citationKeys: [],
  details: [],

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

  actions: {
    showInvalidDetails(aways) {
      const model = this.get('model');

      if (aways === undefined) {
        if (model.invalidFields.length) { this.toggleProperty('showInvalidDetails'); }
      } else {
        this.set('showInvalidDetails', !!aways);
        this.set('showMissingDetails', false);
        this.set('showFormattedDetails', false);
      }

      if (this.get('showInvalidDetails')) {
        this.set('citationKeys', _.map(model.invalidFields, 'citationKey'));

        const details = _.chain(model.invalidFields)
          .uniqBy('field')
          .map(d => _.pick(d, ['field', 'message']))
          .value();

        this.set('details', details);
      }
    },
    showMissingDetails(aways) {
      const model = this.get('model');

      if (aways === undefined) {
        if (model.missingFields.length) { this.toggleProperty('showMissingDetails'); }
      } else {
        this.set('showMissingDetails', !!aways);
        this.set('showInvalidDetails', false);
        this.set('showFormattedDetails', false);
      }

      if (this.get('showMissingDetails')) {
        this.set('citationKeys', _.map(model.missingFields, 'citationKey'));

        const details = _.chain(model.missingFields)
          .uniqBy('field')
          .map(d => _.pick(d, ['field', 'message']))
          .value();

        this.set('details', details);
      }
    },
    showFormattedDetails(aways) {
      const model = this.get('model');

      if (aways === undefined) {
        if (model.formattedFields.length) { this.toggleProperty('showFormattedDetails'); }
      } else {
        this.set('showFormattedDetails', !!aways);
        this.set('showInvalidDetails', false);
        this.set('showMissingDetails', false);
      }

      if (this.get('showFormattedDetails')) {
        this.set('citationKeys', _.map(model.formattedFields, 'citationKey'));

        const details = _.chain(model.formattedFields)
          .uniqBy('field')
          .map(d => _.pick(d, ['field', 'message']))
          .value();

        this.set('details', details);
      }
    },
  }
});
