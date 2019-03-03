const convertJsToSass = require('./convertJsToSass')

const testCases = [
  { name: 'converts string', input: { it: 'value' } },
  { name: 'converts multi line string', input: { it: 'line1\nline2' } },
  { name: 'converts string with single quotes', input: { it: '"value"' } },
  { name: 'converts string with double quotes', input: { it: "'value'" } },
  { name: 'converts multi line string with double quotes', input: { it: '"line1\nline2"' } },
  { name: 'converts multi line string with single quotes', input: { it: "'line1\nline2'" } },
  { name: 'converts number', input: { it: 5 } },
  { name: 'converts empty array', input: { it: [] } },
  { name: 'converts simple simple', input: { it: [1, 2] } },
  { name: 'converts multiple vars', input: { it: 'value', also: 'this' } },
  {
    name: 'converts array with nested arrays',
    input: { it: [['list', 1], ['list', 2]] },
  },
  {
    name: 'converts object with nested array',
    input: { it: [15, 'px', { nested: ['oh', 'no'] }] },
  },
  { name: 'converts empty object', input: {} },
  { name: 'converts simple object', input: { it: { a: 1 } } },
  { name: 'converts multi value object', input: { it: { a: 1, b: 2 } } },
  {
    name: 'converts nested object: nested',
    input: { it: { a: 1, b: 2, c: { d: 4 } } },
  },
  {
    name: 'converts nested object with array',
    input: { it: { a: 1, b: 2, c: { d: [4, 'px', 'em'] } } },
  },
]
;['sass', 'scss'].forEach(syntax =>
  describe(`With ${syntax} syntax`, () =>
    testCases.forEach(testCase =>
      it(testCase.name, () => expect(convertJsToSass(testCase.input, syntax)).toMatchSnapshot())
    ))
)
