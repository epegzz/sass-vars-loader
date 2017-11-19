function convertJsToSass(obj, isNested) {
  const prefix = isNested ? '' : '$';
  const suffix = isNested ? ',\n' : ';\n';
  const lastItemSuffix = isNested ? '' : ';\n';

  const keys = Object.keys(obj);
  const lines = keys.map(key => `${prefix}${key}:${formatValue(obj[key])}`);

  return lines.length ? `${lines.join(suffix)}${lastItemSuffix}` : '';
}

function formatValue(value) {
  if (value instanceof Array) {
    return `(${value.map(formatValue).join(', ')})`;
  }

  if (typeof value === 'object') {
    return `(\n${convertJsToSass(value, true)}\n)`;
  }

  if (typeof value === 'string') {
    return value;
  }

  return JSON.stringify(value);
}

export default convertJsToSass;
