export function initialize(application) {
    application.inject('service', 'cookie', 'cookie:main');
}

export default {
    name: 'ember-cli-cookie',
    after: ['cookie'],
    initialize: initialize
};
