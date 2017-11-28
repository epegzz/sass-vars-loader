import convertJsToSass from './convertJsToSass';

describe('With scss syntax', () => {
  it('Converts string', function() {
    const obj = { it: 'value' };
    const out = '$it: value;\n';
    expect(convertJsToSass(obj)).toBe(out);
  });

  it('Converts string with quotes', function() {
    const obj = { it: '"value"' };
    const out = '$it: "value";\n';
    expect(convertJsToSass(obj)).toBe(out);
  });

  it('Converts number', function() {
    const obj = { it: 5 };
    const out = '$it: 5;\n';
    expect(convertJsToSass(obj)).toBe(out);
  });

  it('Converts array: empty', function() {
    const obj = { it: [] };
    const out = '$it: ();\n';
    expect(convertJsToSass(obj)).toBe(out);
  });

  it('Converts array: simple', function() {
    const obj = { it: [1, 2] };
    const out = '$it: (1, 2);\n';
    expect(convertJsToSass(obj)).toBe(out);
  });

  it('Converts array: nested arrays', function() {
    const obj = { it: [['list', 1], ['list', 2]] };
    const out = '$it: ((list, 1), (list, 2));\n';
    expect(convertJsToSass(obj)).toBe(out);
  });

  it('Converts array: nested object with array', function() {
    const obj = { it: [15, 'px', { nested: ['oh', 'no'] }] };
    const out = '$it: (15, px, (nested: (oh, no)));\n';
    expect(convertJsToSass(obj)).toBe(out);
  });

  it('Convertss object: empty', function() {
    const obj = {};
    const out = '';
    expect(convertJsToSass(obj)).toBe(out);
  });

  it('Converts object: simple', function() {
    const obj = { it: { a: 1 } };
    const out = '$it: (a: 1);\n';
    expect(convertJsToSass(obj)).toBe(out);
  });

  it('Converts object: multi value', function() {
    const obj = { it: { a: 1, b: 2 } };
    const out = '$it: (a: 1, b: 2);\n';
    expect(convertJsToSass(obj)).toBe(out);
  });

  it('Converts object: nested', function() {
    const obj = { it: { a: 1, b: 2, c: { d: 4 } } };
    const out = '$it: (a: 1, b: 2, c: (d: 4));\n';
    expect(convertJsToSass(obj)).toBe(out);
  });

  it('Converts object: nested with array', function() {
    const obj = { it: { a: 1, b: 2, c: { d: [4, 'px', 'em'] } } };
    const out = '$it: (a: 1, b: 2, c: (d: (4, px, em)));\n';
    expect(convertJsToSass(obj)).toBe(out);
  });
});

describe('With sass syntax', () => {
  it('Converts string', function() {
    const obj = { it: 'value' };
    const out = '$it: value\n';
    expect(convertJsToSass(obj, 'sass')).toBe(out);
  });

  it('Converts string with quotes', function() {
    const obj = { it: '"value"' };
    const out = '$it: "value"\n';
    expect(convertJsToSass(obj, 'sass')).toBe(out);
  });

  it('Converts number', function() {
    const obj = { it: 5 };
    const out = '$it: 5\n';
    expect(convertJsToSass(obj, 'sass')).toBe(out);
  });

  it('Converts array: empty', function() {
    const obj = { it: [] };
    const out = '$it: ()\n';
    expect(convertJsToSass(obj, 'sass')).toBe(out);
  });

  it('Converts array: simple', function() {
    const obj = { it: [1, 2] };
    const out = '$it: (1, 2)\n';
    expect(convertJsToSass(obj, 'sass')).toBe(out);
  });

  it('Converts array: nested arrays', function() {
    const obj = { it: [['list', 1], ['list', 2]] };
    const out = '$it: ((list, 1), (list, 2))\n';
    expect(convertJsToSass(obj, 'sass')).toBe(out);
  });

  it('Converts array: nested object with array', function() {
    const obj = { it: [15, 'px', { nested: ['oh', 'no'] }] };
    const out = '$it: (15, px, (nested: (oh, no)))\n';
    expect(convertJsToSass(obj, 'sass')).toBe(out);
  });

  it('Convertss object: empty', function() {
    const obj = {};
    const out = '';
    expect(convertJsToSass(obj, 'sass')).toBe(out);
  });

  it('Converts object: simple', function() {
    const obj = { it: { a: 1 } };
    const out = '$it: (a: 1)\n';
    expect(convertJsToSass(obj, 'sass')).toBe(out);
  });

  it('Converts object: multi value', function() {
    const obj = { it: { a: 1, b: 2 } };
    const out = '$it: (a: 1, b: 2)\n';
    expect(convertJsToSass(obj, 'sass')).toBe(out);
  });

  it('Converts object: nested', function() {
    const obj = { it: { a: 1, b: 2, c: { d: 4 } } };
    const out = '$it: (a: 1, b: 2, c: (d: 4))\n';
    expect(convertJsToSass(obj, 'sass')).toBe(out);
  });

  it('Converts object: nested with array', function() {
    const obj = { it: { a: 1, b: 2, c: { d: [4, 'px', 'em'] } } };
    const out = '$it: (a: 1, b: 2, c: (d: (4, px, em)))\n';
    expect(convertJsToSass(obj, 'sass')).toBe(out);
  });
});
