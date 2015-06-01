'use strict';

var content = '\nvar koa          = require(\'koa\'),\n    app          = koa(),\n    path         = require(\'path\'),\n    staticCache  = require(\'koa-static-cache\')\n\nvar isProduction = process.env.NODE_ENV === \'production\',\n    port         = isProduction ? 8080 : 3000,\n    maxAge       = isProduction ? 365 * 24 * 60 * 60 : 0\n\n// logger\napp.use(function *(next){\n  var start = new Date()\n  yield next\n  var ms = new Date() - start\n  console.log(\'%s %s - %s\', this.method, this.url, ms)\n})\n\napp.use(staticCache(path.join(__dirname, \'public\'), { maxAge: maxAge }))\n\napp.listen(port)\n';

module.exports = function (name) {
  return {
    target: 'server',
    content: content
  };
};