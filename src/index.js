'use strict';

const loaderUtils = require('loader-utils');
const fs = require('fs');
const convert = require('./convert');
const path = require('path');

module.exports = function(content) {
  this.cacheable();

  const config = loaderUtils.getOptions(this);

  const vars = {};
  if (config.files) {
    if (!Array.isArray(config.files)) {
      config.files = [config.files];
    }
    config.files.forEach(filepath => {
      if (filepath.endsWith('.json')) {
        Object.assign(vars, JSON.parse(fs.readFileSync(filepath, 'utf8')));
      }
      if (filepath.endsWith('.js')) {
        const resolvedFilePath = path.resolve(filepath.replace(/["']/g, ''));
        delete require.cache[resolvedFilePath];
        Object.assign(vars, require(filepath));
      }
    });
  }

  if (config.vars) {
    if (typeof config.vars === 'object') {
      Object.assign(vars, config.vars);
    } else {
      Object.assign(vars, JSON.parse(config.vars));
    }
  }

  function jsToSass(obj) {
    const opts = {
      prefix: '$',
      suffix: ';',
      suffixLastItem: true
    };
    var sass = convert(obj, opts);
    return sass;
  }

  return [jsToSass(vars), content].join('\n');
};
