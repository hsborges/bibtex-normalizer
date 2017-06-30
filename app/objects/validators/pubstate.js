class PubstateValidator {
  constructor() { }

  validate(value) {
    return {
      isValid: ['inpreparation', 'submitted', 'forthcoming', 'inpress', 'prepublished'].indexOf(value.toLowerCase()),
      message: 'Must be a valid publication state.'
    };
  }
}

export default (new PubstateValidator());
