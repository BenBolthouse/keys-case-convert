const converters = require('./converters');

const caseConvert = (input, settings) => {
  const inputType = typeof input;
  const inputIsArray = Array.isArray(input);
  const settingsType = typeof settings;
  const settingsIsArray = Array.isArray(settings);
  const evalCaseTypes = ['camel', 'pascal', 'kebab', 'snake'];
  let evalDeep = false; //     <-- default
  let evalData = 'string'; //  <-- default
  let evalCase = 'camel'; //   <-- default
  // throws when input is undefined
  // throws when ONLY settings is defined
  // does NOT throw when ONLY input is defined
  // does NOT throw both input and settings are defined
  if (!(input || settings) || (!input && settings)) {
    throw Error('Input argument is required.');
  }

  // throws when input is NOT type of string, array or object
  if (input) {
    if (inputIsArray) evalData = 'array';
    else if (inputType === 'object') evalData = 'object';
    else if (inputType === 'string') evalData = 'string';
    else throw Error('Input argument must be a string, array or object.');
  }

  // throws when settings is NOT type of object
  if (settings) {
    if (settingsType !== 'object' || settingsIsArray) {
      throw Error('Settings argument must be an object.');
    }
    // throws when settings prop case is NOT type of string or a valid case
    if (settings.case) {
      const isValidCase = evalCaseTypes.includes(settings.case);
      if (!isValidCase) {
        throw Error('Settings property case must be a string and a valid case.');
      }
      evalCase = settings.case;
    }
    // throws when settings prop deep is NOT type of boolean
    if (settings.deep) {
      if (typeof settings.deep !== 'boolean') {
        throw Error('Settings property deep must be a boolean.');
      }
      evalDeep = settings.deep;
    }
  }

  if (evalData === 'string') {
    switch (evalCase) {
      case 'camel':
        return converters.camel(input);
      case 'pascal':
        return converters.pascal(input);
      case 'kebab':
        return converters.kebab(input);
      case 'snake':
        return converters.snake(input);
    }
  }

  // gives correct output for NON-deep conversions &&
  // gives correct output for deep conversions
  if (evalData === 'array') {
    return input.map(element => {
      if (typeof element === 'object' && evalDeep) {
        return caseConvert(element, { case: evalCase, deep: true });
      } else {
        return element;
      }
    });
  }

  if (evalData === 'object') {
    let newObj = {};
    for (const key in input) {
      let newKey;
      let newVal;
      const val = input[key];
      if (typeof val === 'object' && evalDeep) {
        newVal = caseConvert(val, { case: evalCase, deep: true });
      } else {
        newVal = val;
      }
      switch (evalCase) {
        case 'camel':
          newKey = converters.camel(key);
          break;
        case 'pascal':
          newKey = converters.pascal(key);
          break;
        case 'kebab':
          newKey = converters.kebab(key);
          break;
        case 'snake':
          newKey = converters.snake(key);
          break;
      }
      newObj[newKey] = newVal;
    }
    return newObj;
  }
};

module.exports = caseConvert;
