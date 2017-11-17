function objToValue(obj, opts) {
  const keys = Object.keys(obj);
  const fields = keys.map(function(key) {
    const value = formatValue(obj[key]);
    return opts.prefix + key + ':' + value;
  });

  const result = fields.join(`${opts.suffix}\n`);
  if (opts.suffixLastItem) {
    return result + opts.suffix;
  }

  return result;
}

function formatValue(value) {
  if (value instanceof Array) {
    const result = value.map(formatValue);
    return `(${result.join(', ')})`;
  }

  if (typeof value === 'object') {
    const opts = {
      prefix: '',
      suffix: ',',
      suffixLastItem: false
    };
    return `(\n${objToValue(value, opts)}\n)`;
  }

  if (typeof value === 'string') {
    return value;
  }

  return JSON.stringify(value);
}

module.exports = objToValue;
