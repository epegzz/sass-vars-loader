# A SASS vars loader for Webpack

Load global SASS vars from JS/JSON files or from Webpack config.


## Install

```sh
npm install @epegzz/sass-vars-loader --save-dev
```

## Usage with passing vars directly in webpack config

Simply pass the SASS vars as plain JS object to the `sassVars` config property:

```javascript
// webpack.js
loader: ExtractTextPlugin.extract('style', 'css!sass!@epegzz/sass-vars-loader')
sassVars: {
  vars: {
    breakpoints: {
      small: '300px',
      medium: '600px'
    }
    colors: {
      error: 'red'; 
    }
  }
}
```

## Usage with loading vars from JS or JSON files

Pass filenames as array to the `sassVars` config object:


```javascript
// webpack.js
loader: ExtractTextPlugin.extract('style', 'css!sass!@epegzz/sass-vars-loader')
sassVars: {
  files: [
    path.resolve(__dirname, '/path/to/breakpoints.js'), // JS
    path.resolve(__dirname, '/path/to/colors.json'), // JSON
  ]
}
```

With `breakpoints.js`:

```javascript
const breakpoints = {
  small: '300px',
  medium: '600px',
}
module.exports = { breakpoints };
```

And `colors.json`:

```json
{
  "colors": {
    "error": "red"
  }  
}
```

This will result in the following SASS vars being available in all SASS files:

```scss
$breakpoints: (
  small: 300px,
  medium: 600px,
);

$colors: (
  error: red,
);
```


# Acknowledgments

SASS var generator shamelessly copied from [Kasu/jsonToSassVars.js](https://gist.github.com/Kasu/ea4f4861a81e626ea308)
