// preprocessor.js
var coffee     = require('coffee-script');
var ReactTools = require('react-tools');
var babel = require("babel");

module.exports = {
  process: function(src, path) {
    // CoffeeScript files can be .coffee, .litcoffee, or .coffee.md
    if (coffee.helpers.isCoffee(path)) {
      return coffee.compile(src, {'bare': true});
    } else {
      return babel.transform(src).code;
      //return ReactTools.transform(src);
    }
    return src;
  }
};
