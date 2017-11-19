import convertJsToSass from './convertJsToSass';

it('Converts string', function() {
  const obj = { it: 'value' };
  const out = '$it:value;\n';
  expect(convertJsToSass(obj)).toBe(out);
});

it('Converts string with quotes', function() {
  const obj = { it: '"value"' };
  const out = '$it:"value";\n';
  expect(convertJsToSass(obj)).toBe(out);
});

it('Converts number', function() {
  const obj = { it: 5 };
  const out = '$it:5;\n';
  expect(convertJsToSass(obj)).toBe(out);
});

it('Converts array: empty', function() {
  const obj = { it: [] };
  const out = '$it:();\n';
  expect(convertJsToSass(obj)).toBe(out);
});

it('Converts array: simple', function() {
  const obj = { it: [1, 2] };
  const out = '$it:(1, 2);\n';
  expect(convertJsToSass(obj)).toBe(out);
});

it('Converts array: nested arrays', function() {
  const obj = { it: [['list', 1], ['list', 2]] };
  const out = '$it:((list, 1), (list, 2));\n';
  expect(convertJsToSass(obj)).toBe(out);
});

it('Converts array: nested object with array', function() {
  const obj = { it: [15, 'px', { nested: ['oh', 'no'] }] };
  const out = '$it:(15, px, (\nnested:(oh, no)\n));\n';
  expect(convertJsToSass(obj)).toBe(out);
});

it('Convertss object: empty', function() {
  const obj = {};
  const out = '';
  expect(convertJsToSass(obj)).toBe(out);
});

it('Converts object: simple', function() {
  const obj = { it: { a: 1 } };
  const out = '$it:(\na:1\n);\n';
  expect(convertJsToSass(obj)).toBe(out);
});

it('Converts object: multi value', function() {
  const obj = { it: { a: 1, b: 2 } };
  const out = '$it:(\na:1,\nb:2\n);\n';
  expect(convertJsToSass(obj)).toBe(out);
});

it('Converts object: nested', function() {
  const obj = { it: { a: 1, b: 2, c: { d: 4 } } };
  const out = '$it:(\na:1,\nb:2,\nc:(\nd:4\n)\n);\n';
  expect(convertJsToSass(obj)).toBe(out);
});

it('Converts object: nested with array', function() {
  const obj = { it: { a: 1, b: 2, c: { d: [4, 'px', 'em'] } } };
  const out = '$it:(\na:1,\nb:2,\nc:(\nd:(4, px, em)\n)\n);\n';
  expect(convertJsToSass(obj)).toBe(out);
});
