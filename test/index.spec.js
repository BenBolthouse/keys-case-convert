const caseConvert = require('../index');
const chai = require('chai');

const expect = chai.expect;

let settings;

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
});
