var convert = require('./convert');

test('Convert string', function() {
  var obj = {test: 'value'};
  var opts = {
    prefix: "$",
    suffix: ";",
    suffixLastItem: true,
  };
  var out = '$test:value;';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert string with quotes', function() {
  var obj = {test: '"value"'};
  var opts = {
    prefix: "$",
    suffix: ";",
    suffixLastItem: true,
  };
  var out = '$test:"value";';
  expect(convert(obj, opts)).toBe(out);
});


test('Convert number', function() {
  var obj = {test: 5};
  var opts = {
    prefix: "$",
    suffix: ";",
    suffixLastItem: true,
  };
  var out = '$test:5;';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert array', function() {
  var obj = {test: [1, 2]};
  var opts = {
    prefix: "$",
    suffix: ";",
    suffixLastItem: true,
  };
  var out = '$test:1, 2;';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert object: simple', function() {
  var obj = {test: {a: 1}};
  var opts = {
    prefix: "$",
    suffix: ";",
    suffixLastItem: true,
  };
  var out = '$test:(\na:1\n);';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert object: multi value', function() {
  var obj = {test: {a: 1, b: 2}};
  var opts = {
    prefix: "$",
    suffix: ";",
    suffixLastItem: true,
  };
  var out = '$test:(\na:1,\nb:2\n);';
  expect(convert(obj, opts)).toBe(out);
});

test('Convert object: nested', function() {
  var obj = {test: {a: 1, b: 2, c: {d: 4}}};
  var opts = {
    prefix: "$",
    suffix: ";",
    suffixLastItem: true,
  };
  var out = '$test:(\na:1,\nb:2,\nc:(\nd:4\n)\n);';
  expect(convert(obj, opts)).toBe(out);
});

