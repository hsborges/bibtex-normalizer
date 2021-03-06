class SubtitleValidator {
  constructor() {
    this.properNames = ['Android', 'GitHub', 'YouTube', 'Twitter', 'Facebook', 'API', 'Java', 'JavaScript', 'Ruby'];
    //regex (RegExp object) to identify multiple properNames in attribute
    this.properNamesRegex = new RegExp(`\\W(${this.properNames.join(")(\\W|$)|\\W(")})(\\W|$)`, 'gi');
    this.correctRegex = new RegExp(`\\{${this.properNames.join("\\}|\\{")}\\}`, 'g');
  }

  validate(value) {
    let a = this.properNamesRegex.test(value),
      b = this.correctRegex.test(value);
    // XNOR: valid content when both regex return same boolean
    let isValid = !((a && !b) || (!a && b));

    return {
      isValid: isValid,
      message: 'Autocorrection of proper names (e.g., {YouTube}, {Twitter}, and {Facebook})',
      alternative: isValid ? null : this.fix(value)
    };
  }

  fix(value) {
    // filter: unique values in array
    let occurrences = value.match(this.properNamesRegex).filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });

    // for each invalid proper name, find all occurrences from term
    for(let j=0; j<occurrences.length; j++) {
      _.each(this.properNames, (word) => {
        let index = -1;

        // stringFixed allows to fetch any brackets found in regex and put it with the correct word
        let stringFixed = "";
        if(occurrences[j][0] === '{') {
          stringFixed = "{";
        }
        stringFixed += word;

        if(occurrences[j].trim().replace('{', '').replace('}','').toLowerCase() === word.toLowerCase()) {
          stringFixed += (occurrences[j][occurrences[j].length-1] === '}') ? '}' : '';
          while ((index = value.indexOf(occurrences[j], index+1)) !== -1){
            value = value.replace(occurrences[j], ` {${stringFixed}} `);
          }
        }
      });
    }

    // return value.replace(/\{+/, '{').replace(/\}+/, '}');
    return value.replace(/ +(?= )/g,'');
  }
}

export default (new SubtitleValidator());
