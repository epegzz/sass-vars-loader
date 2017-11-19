<h1 align="center">Sass Vars Loader</h1>
<h3 align="center">Use external vars in your SCSS files</h3>
<p align="center">
  <a target="_blank" href="https://travis-ci.org/epegzz/sass-vars-loader">
    <img alt="Travis" src="https://img.shields.io/travis/epegzz/sass-vars-loader.svg?style=flat-square">
  </a>
  <a target="_blank" href="https://codecov.io/gh/epegzz/sass-vars-loader">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/epegzz/sass-vars-loader.svg?style=flat-square">
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/@epegzz/sass-vars-loader">
    <img alt="npm version" src="https://img.shields.io/npm/v/@epegzz/sass-vars-loader.svg?style=flat-square">
  </a>
  <a target="_blank" href="https://www.npmjs.com/package/@epegzz/sass-vars-loader">
    <img alt="npm version" src="https://img.shields.io/npm/dm/@epegzz/sass-vars-loader.svg?style=flat-square">
  </a>
  <a target="_blank" href="https://david-dm.org/epegzz/sass-vars-loader">
    <img alt="dependencies" src="https://img.shields.io/david/epegzz/sass-vars-loader.svg?style=flat-square">
  </a>
</p>

<br/>


This loader allows you to load Sass variables from:
* JSON files
* Javascript files
* Inlined in your Webpack config file


## Install

```sh
npm install @epegzz/sass-vars-loader --save-dev
```

## Usage

Look at the [Example Webpack Config File](./example/webpack.config.js) to see how to use this
loader in conjunction with [style-loader](https://github.com/webpack-contrib/style-loader) and
[css-loader](https://github.com/webpack-contrib/css-loader)

### Option 1: Inline Sass vars in the webpack config

```scss
// styles.css:

.some-class {
  background: $greenFromWebpackConfig;
}
```

```js
// webpack.config.js

var path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        // Inserts all imported styles into the html document
        { loader: "style-loader" },

        // Translates CSS into CommonJS
        { loader: "css-loader" },

        // Compiles Sass to CSS
        { loader: "sass-loader", options: { includePaths: ["app/styles.scss"] } },

        // Reads Sass vars from files or inlined in the options property
        { loader: "@epegzz/sass-vars-loader", options: {
          // Option 1) Specify vars here
          vars: {
            greenFromWebpackConfig: '#0f0'
          }
        }
      }]
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

### Option 2: Load Sass vars from JSON file

```js
// config/sassVars.json

{
  "purpleFromJSON": "purple"
}
```

```scss
// styles.css:

.some-class {
  background: $purpleFromJSON;
}
```

```js
// webpack.config.js

var path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        // Inserts all imported styles into the html document
        { loader: "style-loader" },

        // Translates CSS into CommonJS
        { loader: "css-loader" },

        // Compiles Sass to CSS
        { loader: "sass-loader", options: { includePaths: ["app/styles.scss"] } },

        // Reads Sass vars from files or inlined in the options property
        { loader: "@epegzz/sass-vars-loader", options: {
          files: [
            // Option 2) Load vars from JSON file
            path.resolve(__dirname, 'config/sassVars.json')
          ]
        }
      }]
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```


### Option 3: Load Sass vars from Javascript file

```js
// config/sassVars.js

module.exports = {
  blueFromJavascript: 'blue'
};
```

```scss
// styles.css:

.some-class {
  background: $blueFromJavascript;
}
```

```js
// webpack.config.js

var path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        // Inserts all imported styles into the html document
        { loader: "style-loader" },

        // Translates CSS into CommonJS
        { loader: "css-loader" },

        // Compiles Sass to CSS
        { loader: "sass-loader", options: { includePaths: ["app/styles.scss"] } },

        // Reads Sass vars from files or inlined in the options property
        { loader: "@epegzz/sass-vars-loader", options: {
          files: [
            // Option 3) Load vars from Javascript file
            path.resolve(__dirname, 'config/sassVars.js')
          ]
        }
      }]
    }]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```


### Pro Tip: Nested Vars!

Use [map_get](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_get-instance_method)
in order to use objects as Sass vars:

```js
// config/sassVars.js

module.exports = {
  lightTheme: {
    background: 'white',
    color: 'black'
  },
  darkTheme: {
    background: 'black',
    color: 'gray'
  }
};
```

```scss
// styles.css:

$theme: $lightTheme;

.some-class {
  background: map_get($theme, background);
  color: map_get($theme, color);
}
```
