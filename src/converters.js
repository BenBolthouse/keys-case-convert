const converters = {
  alphaChars: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numberChars: '1234567890',
  separatorChars: '-_ ',
  camel(input) {
    this.checkIsString(input);
    let isFirstChar = true;
    let prevCharIsSeparator = false;
    let outString = '';
    input.split('').forEach(char => {
      this.checkIllegalChar(char);
      const charType = this.getCharType(char);
      if (isFirstChar && charType === 'alpha') {
        outString += char.toLowerCase();
        isFirstChar = false;
        return;
      }
      if (!isFirstChar && charType === 'separator') {
        prevCharIsSeparator = true;
        return;
      }
      if (!isFirstChar && prevCharIsSeparator) {
        outString += char.toUpperCase();
        prevCharIsSeparator = false;
        return;
      }
      if (!isFirstChar) {
        outString += char;
        return;
      }
      return;
    });
    return outString;
  },
  pascal(input) {
    this.checkIsString(input);
    let isFirstChar = true;
    let prevCharIsSeparator = false;
    let outString = '';
    input.split('').forEach(char => {
      this.checkIllegalChar(char);
      const charType = this.getCharType(char);
      if (isFirstChar && charType === 'alpha') {
        outString += char.toUpperCase();
        isFirstChar = false;
        return;
      }
      if (!isFirstChar && charType === 'separator') {
        prevCharIsSeparator = true;
        return;
      }
      if (!isFirstChar && prevCharIsSeparator) {
        outString += char.toUpperCase();
        prevCharIsSeparator = false;
        return;
      }
      if (!isFirstChar) {
        outString += char;
        return;
      }
      return;
    });
    return outString;
  },
  kebab(input) {
    this.checkIsString(input);
    const separator = '-';
    let isFirstChar = true;
    let prevCharIsSeparator = false;
    let outString = '';
    input.split('').forEach(char => {
      this.checkIllegalChar(char);
      const charType = this.getCharType(char);
      if (charType === 'alpha') char = char.toLowerCase();
      if (isFirstChar && charType === 'alpha') {
        outString += char;
        isFirstChar = false;
        return;
      }
      if (!isFirstChar && charType === 'separator') {
        prevCharIsSeparator = true;
        return;
      }
      if (!isFirstChar && prevCharIsSeparator) {
        outString += separator + char;
        prevCharIsSeparator = false;
        return;
      }
      if (!isFirstChar) {
        outString += char;
        return;
      }
      return;
    });
    return outString;
  },
  snake(input) {
    this.checkIsString(input);
    const separator = '_';
    let isFirstChar = true;
    let prevCharIsSeparator = false;
    let outString = '';
    input.split('').forEach(char => {
      this.checkIllegalChar(char);
      const charType = this.getCharType(char);
      if (charType === 'alpha') char = char.toLowerCase();
      if (isFirstChar && charType === 'alpha') {
        outString += char;
        isFirstChar = false;
        return;
      }
      if (!isFirstChar && charType === 'separator') {
        prevCharIsSeparator = true;
        return;
      }
      if (!isFirstChar && prevCharIsSeparator) {
        outString += separator + char;
        prevCharIsSeparator = false;
        return;
      }
      if (!isFirstChar) {
        outString += char;
        return;
      }
      return;
    });
    return outString;
  },
  getCharType(char) {
    if (this.alphaChars.includes(char)) {
      return 'alpha';
    }
    if (this.numberChars.includes(char)) {
      return 'number';
    }
    if (this.separatorChars.includes(char)) {
      return 'separator';
    }
  },
  // throws when input type of string has an illegal character
  checkIllegalChar(char) {
    if (
      !this.alphaChars.includes(char) &&
      !this.numberChars.includes(char) &&
      !this.separatorChars.includes(char)
    ) {
      throw Error(`Illegal character found: "${char}"`);
    }
  },
  checkIsString(input) {
    if (typeof input !== 'string') {
      throw Error(`Received non-string input: "${input}"`)
    }
  }
};

module.exports = converters;
