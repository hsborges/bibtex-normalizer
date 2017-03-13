export function initialize(container, application) {
    application.inject('controller', 'cookie', 'cookie:main');
}

export default {
    name: 'ember-cli-cookie',
    initialize: initialize
};
