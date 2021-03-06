class VersionValidator {
  constructor() { }

  validate(value) {
    return {
      isValid: /^\d+(\.\d+(\.\d+)?)?$/.test(value.trim()),
      message: 'Layout must follow version standards (e.g., 9 or 9.9 or 9.9.9).'
    };
  }
}

export default (new VersionValidator());
