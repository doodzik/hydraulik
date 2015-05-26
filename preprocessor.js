// preprocessor.js
var babel  = require('babel-core')

module.exports = {
  process: function(src, path) {
    if (path.indexOf('node_modules/') >= 0 || path.match(/\.js$/)) {
      return src
    } else {
      return babel.transform(src).code
    }
  }
}
