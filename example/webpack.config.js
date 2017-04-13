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
          files: [
            // Option 2) Load vars from JSON file
            path.resolve(__dirname, 'app/colors.json'),
            // Option 3) Load vars from JS file
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
};