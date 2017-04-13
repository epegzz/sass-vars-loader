# A SASS vars loader for Webpack

Reads sass vars from Javascript files, from JSON files or from the Webpack config.


## Install

```sh
npm install @epegzz/sass-vars-loader --save-dev
```

## Usage

The following files can all be found in the `example` directory, which contains a fully functional example of how to use the sass-vars-loader.

The example projects uses `sass-vars-loader` to inject vars into sass files. In this case `app/styles.scss`:

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


Take a look at the `sass-vars-loader` section in `webpack.config.js` to see how they were loaded: 
 

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

SASS var generator shamelessly copied from [Kasu/jsonToSassVars.js](https://gist.github.com/Kasu/ea4f4861a81e626ea308)
