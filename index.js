/**
 * 1.0  handling of input and settings arguments...
 * 1.1    throws when input is undefined
 * 1.2    throws when ONLY settings is defined
 * 1.3    does NOT throw when ONLY input is defined
 * 1.4    does NOT throw both input and settings are defined
 * 2.0  handling of input argument...
 * 2.1    throws when input is NOT type of string, array or object
 * 3.0  handling of settings argument...
 * 3.1    throws when settings is NOT type of object
 * 3.3    throws when settings prop case is NOT type of string or a valid case
 * 3.4    throws when settings prop deep is NOT type of boolean
 */

const caseConvert = (input, settings) => {
  const inputType = typeof input;
  const inputIsArray = Array.isArray(input);
  const settingsType = typeof settings;
  const settingsIsArray = Array.isArray(settings);
  const evalCaseTypes = ['camel', 'pascal', 'kebab', 'snake'];
  let evalDataType;
  let evalCaseType = 'camel'; // <-- defaults without settings
  // throws when input is undefined
  // throws when ONLY settings is defined
  // does NOT throw when ONLY input is defined
  // does NOT throw both input and settings are defined
  if (!(input || settings) || (!input && settings)) {
    throw Error('Input argument is required.');
  }

  // throws when input is NOT type of string, array or object
  if (input) {
    if (inputIsArray) evalDataType = 'array';
    else if (inputType === 'object') evalDataType = 'object';
    else if (inputType === 'string') evalDataType = 'string';
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
    }
    // throws when settings prop deep is NOT type of boolean
    if (settings.deep) {
      if (typeof settings.deep !== 'boolean') {
        throw Error('Settings property deep must be a boolean.');
      }
    }
  }
};
module.exports = caseConvert;
