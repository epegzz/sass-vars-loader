const path = require('path')

module.exports = {
  entry: './src/index.js',
  watch: true,
  mode: 'production',
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
            options: { includePaths: ['app/styles.scss'] },
          },

          // Reads Sass vars from files or inlined in the options property
          {
            loader: '@epegzz/sass-vars-loader',
            options: {
              // You can specify vars here
              vars: {
                greenFromWebpackConfig: 'opaque(green, 0.5)', // `opaque` is defined in `config/utils.scss` which gets loaded below
              },
              files: [
                // You can include sass files
                path.resolve(__dirname, 'config/utils.scss'),
                // You can include JSON files
                path.resolve(__dirname, 'config/sassVars.json'),
                // You can include JavaScript files
                path.resolve(__dirname, 'config/sassVars.js'),
              ],
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
