const convert = require('./convert');

test('Convert string', function() {
  const obj = {test: 'value'};
  const opts = {
    prefix: "$",
    suffix: ";",
    suffixLastItem: true,
  };
  const out = '$test:value;';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert string with quotes', function() {
  const obj = {test: '"value"'};
  const opts = {
    prefix: "$",
    suffix: ";",
    suffixLastItem: true,
  };
  const out = '$test:"value";';
  expect(convert(obj, opts)).toBe(out);
});


test('Convert number', function() {
  const obj = {test: 5};
  const opts = {
    prefix: "$",
    suffix: ";",
    suffixLastItem: true,
  };
  const out = '$test:5;';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert array', function() {
  const obj = {test: [1, 2]};
  const opts = {
    prefix: "$",
    suffix: ";",
    suffixLastItem: true,
  };
  const out = '$test:1, 2;';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert object: simple', function() {
  const obj = {test: {a: 1}};
  const opts = {
    prefix: "$",
    suffix: ";",
    suffixLastItem: true,
  };
  const out = '$test:(\na:1\n);';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert object: multi value', function() {
  const obj = {test: {a: 1, b: 2}};
  const opts = {
    prefix: "$",
    suffix: ";",
    suffixLastItem: true,
  };
  const out = '$test:(\na:1,\nb:2\n);';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert object: nested', function() {
  const obj = {test: {a: 1, b: 2, c: {d: 4}}};
  const opts = {
    prefix: "$",
    suffix: ";",
    suffixLastItem: true,
  };
  const out = '$test:(\na:1,\nb:2,\nc:(\nd:4\n)\n);';
  expect(convert(obj, opts)).toBe(out);
});

