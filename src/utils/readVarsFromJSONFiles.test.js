const path = require('path')
const readVarsFromJSONFiles = require('./readVarsFromJSONFiles')

const files = [
  path.resolve(__dirname, '../__mocks__/jsonVars1.json'),
  path.resolve(__dirname, '../__mocks__/jsVars1.js'),
  path.resolve(__dirname, '../__mocks__/jsonVars2.json'),
]

it('returns a vars object as expected', () => {
  expect(readVarsFromJSONFiles(files)).toEqual({
    value1FromJson: 'foo',
    value2FromJson: 'foo',
    loadingOrderTest1: 'fromJSON',
    loadingOrderTest2: 'fromJSON',
  })
})
