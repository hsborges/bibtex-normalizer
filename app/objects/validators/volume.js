class VolumeValidator {
  constructor() { }

  validate(value) {
    return {
      isValid: /^\d/.test(value),
      message: 'Must consist of numerals (e.g., 9).'
    };
  }
}

export default (new VolumeValidator());
