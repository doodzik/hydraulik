var Promise  = require('bluebird'),
    fs       = require('fs')

Promise.promisifyAll(fs)

module.exports = function(yargs) {
  var pDir          = process.cwd(),
      argv          = yargs
                      .demand(2, 'must provide a component name')
                      .argv
                      // capitalize str
      name          = argv._[1].charAt(0).toUpperCase() + string.slice(1),
      component     = require(pDir + '/bin/templates/component.jsx.js')(name)
      componentCss  = require(pDir + '/bin/templates/component.styl.js')(name)
      componentTest = require(pDir + '/bin/templates/component-test.jsx.js')(name)

  fs.mkdir(pDir + '/components/' + name)
  .then(function () {
    return Promise.map([componentTest, component, componentCss], function (templateObj) {
      return fs.writeFile(pDir + '/' + templateObj.target, templateObj.content)
    })
  })
  .catch(function(err) {
    console.error(err)
  })
}
