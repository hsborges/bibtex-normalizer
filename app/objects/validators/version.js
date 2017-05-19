class VersionValidator {
  constructor() { }

  validate(value) {
    return {
      isValid: /^\d+(\.\d+(\.\d+)?)?$/.test(value.trim()),
      message: 'Must consist of version standards (e.g., 9 or 9.9 or 9.9.9).'
    };
  }
}

export default (new VersionValidator());
