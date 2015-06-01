'use strict';

var content = '\n// preprocessor.js\nvar babel  = require(\'babel-core\')\n\nmodule.exports = {\n  process: function(src, path) {\n    if (path.indexOf(\'node_modules/\') >= 0 || path.match(/.js$/)) {\n      return src\n    } else {\n      return babel.transform(src).code\n    }\n  }\n}\n';

module.exports = function (name) {
  return {
    target: 'preprocessor',
    content: content
  };
};