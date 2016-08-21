# A SASS vars loader for Webpack

Load global SASS vars from JS files, JSON files or JS objects.


## Install

```sh
npm install @epegzz/sass-vars-loader --save-dev
```

## Usage with JS object

Simply pass the SASS vars as plain JS object to the `sassVars` config property:

```javascript
// webpack.js
loader: ExtractTextPlugin.extract('style', 'css!sass!sass-vars')
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

## Usage with JS or JSON files

Pass filenames as array to the `sassVars` config object:


```javascript
// webpack.js
loader: ExtractTextPlugin.extract('style', 'css!sass!sass-vars')
sassVars: {
  files: [
    path.resolve(__dirname, '/path/to/breackpoints.js'), // JS
    path.resolve(__dirname, '/path/to/colors.json'), // JSON
  ]
}
```

Example JS and JSON Files:

```javascript
// breakpoints.js
const breakpoints = {
  small: '300px',
  medium: '600px',
}
module.exports = { breakpoints };
```

```json
// colors.json
{
  "colors": {
    "error": "red"
  }  
}
```


# Acknowledgment

SASS var generator shamelessly copied from [Kasu/jsonToSassVars.js](https://gist.github.com/Kasu/ea4f4861a81e626ea308)
