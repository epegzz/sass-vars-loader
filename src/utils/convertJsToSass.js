function convertJsToSass(obj, syntax = 'scss', isNested) {
  const prefix = isNested ? '' : '$';
  const suffix = isNested ? ', ' : syntax === 'sass' ? '\n' : ';\n';
  const lastItemSuffix = isNested ? '' : syntax === 'sass' ? '\n' : ';\n';

  const keys = Object.keys(obj);
  const lines = keys.map(
    key => `${prefix}${key}: ${formatValue(obj[key], syntax)}`
  );

  return lines.length ? `${lines.join(suffix)}${lastItemSuffix}` : '';
}

function formatValue(value, syntax) {
  if (value instanceof Array) {
    return `(${value.map(formatValue).join(', ')})`;
  }

  if (typeof value === 'object') {
    return `(${convertJsToSass(value, syntax, true)})`;
  }

  if (typeof value === 'string') {
    return value;
  }

  return JSON.stringify(value);
}

export default convertJsToSass;
