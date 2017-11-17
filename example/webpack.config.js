const path = require('path');

module.exports = {
  entry: './src/index.js',
  watch: true,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // Inserts all imported styles into the html document
          { loader: 'style-loader' },

          // Translates CSS into CommonJS
          { loader: 'css-loader' },

          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: { includePaths: ['app/styles.scss'] }
          },

          // Reads Sass vars from files or inlined in the options property
          {
            loader: '@epegzz/sass-vars-loader',
            options: {
              // Option 1) Specify vars here
              vars: {
                greenFromWebpackConfig: 'green'
              },
              files: [
                // Option 2) Load vars from JSON file
                path.resolve(__dirname, 'config/sassVars.json'),
                // Option 3) Load vars from JS file
                path.resolve(__dirname, 'config/sassVars.js')
              ]
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
