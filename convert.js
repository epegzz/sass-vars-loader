'use strict';

var opts = {
  prefix: '',
  suffix: '',
  suffixLastItem: true,
};

function objToValue(obj, opts) {
  var keys = Object.keys(obj);
  var fields = keys.map(function(key) {
    var value = formatValue(obj[key]);
    return opts.prefix + key + ":" + value;
  });

  var result = fields.join(opts.suffix + "\n");
  if (opts.suffixLastItem) {
    return result + opts.suffix;
  }

  return result;
}

function formatValue(value) {
  if (value instanceof Array) {
    var result = value.map(function(v) {
      return formatValue(v);
    });
    return result.join(', ');
  }

  if (typeof value === 'object') {
    var opts = {
      prefix: '',
      suffix: ',',
      suffixLastItem: false,
    }
    return '(\n' + objToValue(value, opts) + '\n)';
  }

  if (typeof value === 'string') {
    return value;
  }

  return JSON.stringify(value);
}

module.exports = objToValue;

