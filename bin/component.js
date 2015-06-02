var Promise  = require('bluebird'),
    path     = require('path'),
    fs       = Promise.promisifyAll(require('fs')),
    mkdirp   = Promise.promisifyAll(require("mkdirp"))

module.exports = function(yargs) {
  var pDir          = process.cwd(),
      argv          = yargs
                      .demand(2, 'must provide a set name')
                      .argv,
      name          = argv._[1]
      component     = require(__dirname + '/templates/component.jsx.js')(name),
      componentCss  = require(__dirname + '/templates/component.styl.js')(name),
      componentTest = require(__dirname + '/templates/component-test.jsx.js')(name)

  Promise.map([component, componentCss, componentTest], function (componentObj) {
    return mkdirp.mkdirpAsync(path.dirname(componentObj.target)).then(function () {
      return fs.writeFileAsync(pDir + '/' + componentObj.target, componentObj.content)
    })
  })
  .catch(function(err) {
    console.error(err)
  })
}
