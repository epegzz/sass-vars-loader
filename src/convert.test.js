const convert = require('./convert');

let opts;

beforeEach(function() {
  opts = {
    prefix: "$",
    suffix: ";",
    suffixLastItem: true,
  };
});

test('Convert string', function() {
  const obj = {test: 'value'};
  const out = '$test:value;';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert string with quotes', function() {
  const obj = {test: '"value"'};
  const out = '$test:"value";';
  expect(convert(obj, opts)).toBe(out);
});


test('Convert number', function() {
  const obj = {test: 5};
  const out = '$test:5;';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert array: simple', function() {
  const obj = {test: [1, 2]};
  const out = '$test:(1, 2);';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert array: nested arrays', function() {
  const obj = {test: [["list", 1], ["list", 2]]};
  const out = '$test:((list, 1), (list, 2));';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert array: nested object with array', function() {
  const obj = {test: [15, "px", {"nested": ["oh", "no"]}]};
  const out = '$test:(15, px, (\nnested:(oh, no)\n));';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert object: simple', function() {
  const obj = {test: {a: 1}};
  const out = '$test:(\na:1\n);';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert object: multi value', function() {
  const obj = {test: {a: 1, b: 2}};
  const out = '$test:(\na:1,\nb:2\n);';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert object: nested', function() {
  const obj = {test: {a: 1, b: 2, c: {d: 4}}};
  const out = '$test:(\na:1,\nb:2,\nc:(\nd:4\n)\n);';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert object: nested with array', function() {
  const obj = {test: {a: 1, b: 2, c: {d: [4, "px", "em"]}}};
  const out = '$test:(\na:1,\nb:2,\nc:(\nd:(4, px, em)\n)\n);';
  expect(convert(obj, opts)).toBe(out);
});

