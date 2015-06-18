// preprocessor.js
var babel  = require('babel-core')

module.exports = {
  process: function(src, path) {
    if (path.indexOf('node_modules/') >= 0) {
      return src
    } else {
      return babel.transform(src, { optional: ["es7.decorators"]}).code
    }
  }
}
