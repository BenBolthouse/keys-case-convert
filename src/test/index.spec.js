const caseConvert = require('../index');
const converters = require('../converters');
const spies = require('chai-spies');
const chai = require('chai');

chai.use(spies);

const expect = chai.expect;

/**
 * 1.0  handling of input and settings arguments...
 * 1.1    throws when input is undefined
 * 1.2    throws when ONLY settings is defined
 * 1.3    does NOT throw when ONLY input is defined
 * 1.4    does NOT throw both input and settings are defined
 * 1.5    gives correct output for NON-deep conversions
 * 1.6    gives correct output for deep conversions
 * 2.0  handling of input argument...
 * 2.1    throws when input is NOT type of string, array or object
 * 2.2    gives correct output for each conversion case with input type string
 * 3.0  handling of settings argument...
 * 3.1    throws when settings is NOT type of object
 * 3.3    throws when settings prop case is NOT type of string or a valid case
 * 3.4    throws when settings prop deep is NOT type of boolean
 * 4.0  handling of case-specific module invocation...
 * 4.1    invokes corresponding module functions per settings case
 * 4.2    throws when input type of string has an illegal character
 */

describe('caseConvert()...', () => {
  context('handling of input and settings arguments...', () => {
    it('throws when input is undefined', () => {
      // Arrange
      const input = undefined;
      const settings = undefined;

      // No act needed

      //Assert
      expect(() => caseConvert(input, settings)).to.throw();
    });
    it('throws when ONLY settings is defined', () => {
      // Arrange
      const input = undefined;
      const settings = {};

      // No act needed

      //Assert
      expect(() => caseConvert(input, settings)).to.throw();
    });
    it('does NOT throw when ONLY input is defined', () => {
      // Arrange
      const input = {};
      const settings = undefined;

      // No act needed

      //Assert
      expect(() => caseConvert(input, settings)).to.not.throw();
    });
    it('does NOT throw both input and settings are defined', () => {
      // Arrange
      const input = {};
      const settings = {};

      // No act needed

      //Assert
      expect(() => caseConvert(input, settings)).to.not.throw();
    });
    it('gives correct output for NON-deep conversions', () => {
      // Arrange
      const input1 = {
        layer_one_1: {
          layer_two_1: {},
        },
        layer_one_2: {
          layer_two_2: {},
          layer_two_3: ['layer_three_1', { layer_four_1: '' }],
        },
      };
      const expected1 = {
        layerOne1: {
          layer_two_1: {},
        },
        layerOne2: {
          layer_two_2: {},
          layer_two_3: ['layer_three_1', { layer_four_1: '' }],
        },
      };
      const settings1 = {};
      const settings2 = { deep: false, case: 'camel' };

      // Act
      const result1 = caseConvert(input1, settings1);
      const result2 = caseConvert(input1, settings2);

      // Assert
      expect(result1).to.deep.equal(expected1);
      expect(result2).to.deep.equal(expected1);
    });
    it('gives correct output for deep conversions', () => {
      // Arrange
      const input1 = {
        layer_one_1: {
          layer_two_1: {},
        },
        layer_one_2: {
          layer_two_2: {},
          layer_two_3: ['layer_three_1', { layer_four_1: '' }],
        },
      };
      const expected1 = {
        layerOne1: {
          layerTwo1: {},
        },
        layerOne2: {
          layerTwo2: {},
          layerTwo3: ['layer_three_1', { layerFour1: '' }],
        },
      };

      const settings1 = { deep: true, case: 'camel' };

      // Act
      const result1 = caseConvert(input1, settings1);

      // Assert
      expect(result1).to.deep.equal(expected1);
    });
  });
  context('handling of input argument...', () => {
    it('throws when input is NOT type of string, array or object', () => {
      // Arrange
      const input1 = true;
      const settings1 = undefined;
      const input2 = 12345;
      const settings2 = undefined;
      const input3 = 'string';
      const settings3 = undefined;
      const input4 = [];
      const settings4 = undefined;
      const input5 = {};
      const settings5 = undefined;

      // No act needed

      //Assert
      expect(() => caseConvert(input1, settings1)).to.throw();
      expect(() => caseConvert(input2, settings2)).to.throw();
      expect(() => caseConvert(input3, settings3)).to.not.throw();
      expect(() => caseConvert(input4, settings4)).to.not.throw();
      expect(() => caseConvert(input5, settings5)).to.not.throw();
    });
    it('gives correct output for each conversion case with input type string', () => {
      // Arrange
      const settingA = { case: 'camel' };
      const settingB = { case: 'pascal' };
      const settingC = { case: 'kebab' };
      const settingD = { case: 'snake' };
      const input1 = '__leading_separators';
      const input2 = 'ending_separators__';
      const input3 = '555_leading_numbers';
      const input4 = 'ending_numbers_555';
      const expectedA1 = 'leadingSeparators';
      const expectedA2 = 'endingSeparators';
      const expectedA3 = 'leadingNumbers';
      const expectedA4 = 'endingNumbers555';
      const expectedB1 = 'LeadingSeparators';
      const expectedB2 = 'EndingSeparators';
      const expectedB3 = 'LeadingNumbers';
      const expectedB4 = 'EndingNumbers555';
      const expectedC1 = 'leading-separators';
      const expectedC2 = 'ending-separators';
      const expectedC3 = 'leading-numbers';
      const expectedC4 = 'ending-numbers-555';
      const expectedD1 = 'leading_separators';
      const expectedD2 = 'ending_separators';
      const expectedD3 = 'leading_numbers';
      const expectedD4 = 'ending_numbers_555';

      // No act needed
      const resultA1 = caseConvert(input1, settingA);
      const resultB1 = caseConvert(input1, settingB);
      const resultC1 = caseConvert(input1, settingC);
      const resultD1 = caseConvert(input1, settingD);
      const resultA2 = caseConvert(input2, settingA);
      const resultB2 = caseConvert(input2, settingB);
      const resultC2 = caseConvert(input2, settingC);
      const resultD2 = caseConvert(input2, settingD);
      const resultA3 = caseConvert(input3, settingA);
      const resultB3 = caseConvert(input3, settingB);
      const resultC3 = caseConvert(input3, settingC);
      const resultD3 = caseConvert(input3, settingD);
      const resultA4 = caseConvert(input4, settingA);
      const resultB4 = caseConvert(input4, settingB);
      const resultC4 = caseConvert(input4, settingC);
      const resultD4 = caseConvert(input4, settingD);

      //Assert
      expect(resultA1).to.equal(expectedA1);
      expect(resultB1).to.equal(expectedB1);
      expect(resultC1).to.equal(expectedC1);
      expect(resultD1).to.equal(expectedD1);
      expect(resultA2).to.equal(expectedA2);
      expect(resultB2).to.equal(expectedB2);
      expect(resultC2).to.equal(expectedC2);
      expect(resultD2).to.equal(expectedD2);
      expect(resultA3).to.equal(expectedA3);
      expect(resultB3).to.equal(expectedB3);
      expect(resultC3).to.equal(expectedC3);
      expect(resultD3).to.equal(expectedD3);
      expect(resultA4).to.equal(expectedA4);
      expect(resultB4).to.equal(expectedB4);
      expect(resultC4).to.equal(expectedC4);
      expect(resultD4).to.equal(expectedD4);
    });
  });
  context('handling of settings argument...', () => {
    it('throws when settings is NOT type of object', () => {
      // Arrange
      const input1 = {};
      const settings1 = true;
      const input2 = {};
      const settings2 = 12345;
      const input3 = {};
      const settings3 = {};

      // No act needed

      //Assert
      expect(() => caseConvert(input1, settings1)).to.throw();
      expect(() => caseConvert(input2, settings2)).to.throw();
      expect(() => caseConvert(input3, settings3)).to.not.throw();
    });
    it('throws when settings prop case is NOT type of string or a valid case', () => {
      // Arrange
      const input1 = {};
      const settings1 = { case: true };
      const input2 = {};
      const settings2 = { case: 12345 };
      const input3 = {};
      const settings3 = { case: 'foo' };
      const input4 = {};
      const settings4 = { case: 'bar' };
      const input5 = {};
      const settings5 = { case: 'camel' };
      const input6 = {};
      const settings6 = { case: 'pascal' };
      const input7 = {};
      const settings7 = { case: 'kebab' };
      const input8 = {};
      const settings8 = { case: 'snake' };

      // No act needed

      //Assert
      expect(() => caseConvert(input1, settings1)).to.throw();
      expect(() => caseConvert(input2, settings2)).to.throw();
      expect(() => caseConvert(input3, settings3)).to.throw();
      expect(() => caseConvert(input4, settings4)).to.throw();
      expect(() => caseConvert(input5, settings5)).to.not.throw();
      expect(() => caseConvert(input6, settings6)).to.not.throw();
      expect(() => caseConvert(input7, settings7)).to.not.throw();
      expect(() => caseConvert(input8, settings8)).to.not.throw();
    });
    it('throws when settings prop deep is NOT type of boolean', () => {
      // Arrange
      const input1 = {};
      const settings1 = { deep: 'foo' };
      const input2 = {};
      const settings2 = { deep: 12345 };
      const input3 = {};
      const settings3 = { deep: [] };
      const input4 = {};
      const settings4 = { deep: {} };
      const input5 = {};
      const settings5 = { deep: true };
      const input6 = {};
      const settings6 = { deep: false };

      // No act needed

      //Assert
      expect(() => caseConvert(input1, settings1)).to.throw();
      expect(() => caseConvert(input2, settings2)).to.throw();
      expect(() => caseConvert(input3, settings3)).to.throw();
      expect(() => caseConvert(input4, settings4)).to.throw();
      expect(() => caseConvert(input5, settings5)).to.not.throw();
      expect(() => caseConvert(input6, settings6)).to.not.throw();
    });
  });
  context('handling of case-specific module invocation...', () => {
    it('invokes corresponding module functions per settings case', () => {
      // Arrange
      const spyCamel = chai.spy.on(converters, 'camel');
      const spyPascal = chai.spy.on(converters, 'pascal');
      const spyKebab = chai.spy.on(converters, 'kebab');
      const spySnake = chai.spy.on(converters, 'snake');
      const input1 = 'test';
      const settings1 = {}; // <-- defaults to camel without settings
      const input2 = 'test';
      const settings2 = { case: 'camel' };
      const input3 = 'test';
      const settings3 = { case: 'pascal' };
      const input4 = 'test';
      const settings4 = { case: 'kebab' };
      const input5 = 'test';
      const settings5 = { case: 'snake' };

      // Act
      caseConvert(input1, settings1);
      caseConvert(input2, settings2);
      caseConvert(input3, settings3);
      caseConvert(input4, settings4);
      caseConvert(input5, settings5);

      // Assert
      expect(spyCamel).to.have.been.called.twice;
      expect(spyPascal).to.have.been.called.once;
      expect(spyKebab).to.have.been.called.once;
      expect(spySnake).to.have.been.called.once;
    });
    it('throws when input type of string has an illegal character', () => {
      // Arrange
      const spyCheckIllegalChar = chai.spy.on(converters, 'checkIllegalChar');
      const spyGetCharType = chai.spy.on(converters, 'getCharType');
      const input1 = 'bad_String^';
      const settings1 = { case: 'camel' };
      const input2 = 'bad_String^';
      const settings2 = { case: 'pascal' };
      const input3 = 'bad_String^';
      const settings3 = { case: 'kebab' };
      const input4 = 'bad_String^';
      const settings4 = { case: 'snake' };
      const input5 = 'good_String1';
      const settings5 = { case: 'camel' };
      const input6 = 'good_String1';
      const settings6 = { case: 'pascal' };
      const input7 = 'good_String1';
      const settings7 = { case: 'kebab' };
      const input8 = 'good_String1';
      const settings8 = { case: 'snake' };

      // No act needed

      // Assert
      expect(() => caseConvert(input1, settings1)).to.throw();
      expect(() => caseConvert(input2, settings2)).to.throw();
      expect(() => caseConvert(input3, settings3)).to.throw();
      expect(() => caseConvert(input4, settings4)).to.throw();
      expect(() => caseConvert(input5, settings5)).to.not.throw();
      expect(() => caseConvert(input6, settings6)).to.not.throw();
      expect(() => caseConvert(input7, settings7)).to.not.throw();
      expect(() => caseConvert(input8, settings8)).to.not.throw();
      expect(spyGetCharType).to.have.been.called.exactly(88);
      expect(spyCheckIllegalChar).to.have.been.called.exactly(92);
    });
  });
});

/**
 * 1.0
 */

describe('camel()...', () => {});
