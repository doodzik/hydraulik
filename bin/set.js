var Promise  = require('bluebird'),
    path     = require('path'),
    fs       = Promise.promisifyAll(require('fs')),
    mkdirp   = Promise.promisifyAll(require("mkdirp"))

module.exports = function(yargs) {
  var pDir      = process.cwd(),
      argv      = yargs
                  .demand(2, 'must provide a set name')
                  .argv,
      name      = argv._[1],
      set       = require(__dirname + '/templates/set.js')(name),
      setTest   = require(__dirname + '/templates/set-test.js')(name)

  Promise.map([set, setTest], function (setObj) {
    return mkdirp.mkdirpAsync(path.dirname(setObj.target)).then(function () {
      return fs.writeFileAsync(pDir + '/' + setObj.target, setObj.content)
    })
  })
  .catch(function(err) {
    console.error(err)
  })
}
