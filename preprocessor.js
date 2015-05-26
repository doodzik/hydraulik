// preprocessor.js
var coffee = require('coffee-script')
var babel  = require('babel-core')

module.exports = {
  process: function(src, path) {
    if (path.indexOf('node_modules/') >= 0) {
      return src
    } else if (coffee.helpers.isCoffee(path)) {
      return coffee.compile(src, {'bare': true})
    } else {
      return babel.transform(src, { optional: ["runtime"] }).code
    }
  }
}
