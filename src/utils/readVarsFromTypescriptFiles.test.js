const path = require('path')
const readVarsFromTypescriptFiles = require('./readVarsFromTypescriptFiles')

const files = [
  path.resolve(__dirname, '../__mocks__/jsVars1.js'),
  path.resolve(__dirname, '../__mocks__/jsonVars1.json'),
  path.resolve(__dirname, '../__mocks__/tsVars1.ts'),
  path.resolve(__dirname, '../__mocks__/jsVars2.js'),
]

it('returns a vars object as expected', () => {
  expect(readVarsFromTypescriptFiles(files)).toEqual({
    value1FromTs: 'tsFoo',
    loadingOrderTest4: 'fromTS',
    loadingOrderTest5: 'fromTS',
  })
})
