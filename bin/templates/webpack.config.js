'use strict';

var content = '\nvar webpack = require(\'webpack\')\nmodule.exports = {\n  entry: {\n    client: \'./client.jsx\'\n  },\n  output: {\n    path: __dirname + \'/public\',\n    filename: \'bundle.js\'\n  },\n  module: {\n    loaders: [\n    {\n      test: /.jsx?$/,\n      exclude: /(node_modules|bower_components)/,\n      loader: \'babel\'\n    },\n    {\n      test: /.styl$/,\n      loader: \'style-loader!css-loader!stylus-loader\'\n    }\n    ]\n  },\n  plugins: [\n    new webpack.NoErrorsPlugin()\n  ]\n}\n';

module.exports = function (name) {
  return {
    target: 'webpack.config.js',
    content: content
  };
};