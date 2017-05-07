# A Sass vars loader for Webpack

This loader makes it possible to load Sass variables from:
* JSON files
* Javascript files
* Webpack configuration file


## Install

```sh
npm install @epegzz/sass-vars-loader --save-dev
```

## Usage

The `example` directory contains a fully functional example project.

It uses `sass-vars-loader` to inject vars into sass files in 3 different ways:
 * via Javascript file
 * via JSON file
 * via webpack config

In the file `app/styles.scss` the following vars were injected in one of those 3 ways: `$bodyFontSize`, `$borders`, `$blueColor`, `$grayBackgroundColor`:

```sass
body {

  // Option 1) Read from webpack config
  font-size: $bodyFontSize;

  // Nesting is also possible!
  border: map_get($borders, heavy);

  // Option 2) Read from JSON or Javascript file 
  color: $blueColor; // from colors.json
  background-color: $grayBackgroundColor; // from background.js
}

```

with `app/colors.json`
```json
{
  "blueColor": "blue",
  "redColor": "red"
}
```

and `app/backgrounds.js`
```js
module.exports = {
  grayBackgroundColor: 'gray',
  whiteBackgroundColor: 'white',
};
```


Take a look at the `sass-vars-loader` section in `webpack.config.js` to see how this was done: 
 

```javascript
var path = require('path');

module.exports = {
  entry: './app/index.js',
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader", // compiles Sass to CSS
        options: {
          includePaths: ["app/styles.scss"],
        },
      }, {
        loader: "@epegzz/sass-vars-loader", // read Sass vars from file or options
        options: {
          // Option 1) Specify vars here
          vars: {
            bodyFontSize: '21px',

            // Nesting is also possible (use map_get to read them in scss)!
            borders: {
              heavy: '5px solid black',
              thin: '1px solid gray',
            },
          },
          // Option 2) Load vars from JSON or Javascript file
          files: [
            path.resolve(__dirname, 'app/colors.json'),
            path.resolve(__dirname, 'app/backgrounds.js'),
          ],
        },
      }],
    }],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
```

### Usage with Extract Text Plugin

With the [Extract Text Plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) the webpack.config.js changes slightly:
```javascript
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app/index.js',
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader", // compiles Sass to CSS
          options: {
            includePaths: ["app/styles.scss"],
          },
        }, {
          loader: "@epegzz/sass-vars-loader", // read Sass vars from file or options
          options: {
            // Option 1) Specify vars here
            vars: {
              bodyFontSize: '21px',
    
              // Nesting is also possible (use map_get to read them in scss)!
              borders: {
                heavy: '5px solid black',
                thin: '1px solid gray',
              },
            },
            // Option 2) Load vars from JSON or Javascript file
            files: [
              path.resolve(__dirname, 'app/colors.json'),
              path.resolve(__dirname, 'app/backgrounds.js'),
            ],
          },
        }],
      })
    }],
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
```


# Acknowledgments

Sass var generator shamelessly copied from [Kasu/jsonToSassVars.js](https://gist.github.com/Kasu/ea4f4861a81e626ea308)
