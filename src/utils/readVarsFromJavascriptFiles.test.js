const path = require('path');
const readVarsFromJavascriptFiles = require('./readVarsFromJavascriptFiles');

const files = [
  path.resolve(__dirname, '../__mocks__/jsVars1.js'),
  path.resolve(__dirname, '../__mocks__/jsonVars1.json'),
  path.resolve(__dirname, '../__mocks__/jsVars2.js')
];

it('returns a vars object as expected', () => {
  expect(readVarsFromJavascriptFiles(files)).toEqual({
    value1FromJs: 'foo',
    value2FromJs: 'foo'
  });
});
