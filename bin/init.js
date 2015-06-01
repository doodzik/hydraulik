var Promise  = require('bluebird'),
    fs       = require('fs'),
    shell    = require('shelljs')

Promise.promisifyAll(fs)

module.exports = function(yargs) {
  // get name from package
  var pDir       = process.cwd(),
      saveTarget = pDir + '/package.json',
      data       = require(saveTarget),
      name       = data.name,
      dirs       = [
          'bin', 'lib', 'lib/__tests__', 'sets', 'sets/__tests__',
          'types', 'types/__tests__', 'components', 'components/__tests__', 'public'
        ].map(function (dir) { return pDir + '/' + dir })


  Promise.map(dirs, fs.mkdir)
  .then(function () {
    return fs.readdir(pDir + '/bin/templates')
  })
  .map(function (file) {
    var templateObj = require(pDir + '/bin/templates/' + file)(name)
    return fs.writeFile(pDir + '/' + templateObj.target, templateObj.content)
  })
  .all(function () {
    // extend package info
    data["main"] = "server.js"

    data["scripts"]              = data["scripts"] || {}
    data["scripts"]["start"]     = "./bin/startup.sh"
    data["scripts"]["test"]      = "jest"
    data["scripts"]["webpack"]   = "webpack"
    // data["scripts"]["hydraulik"] = "hydraulik"

    data["dependencies"]                     = data["dependencies"] || {}
    data["dependencies"]["koa"]              = "^0.20.0"
    data["dependencies"]["koa-static-cache"] = "^3.1.1"
    data["dependencies"]["normalize.css"]    =  "^3.0.3"
    data["dependencies"]["object-assign"]    = "^2.0.0"
    data["dependencies"]["react"]            = "^0.13.3"
    // data["dependencies"]["hydraulik"]        = "^0.1.0"

    data["devDependencies"]                      = data["devDependencies"] || {}
    data["devDependencies"]["babel-core"]        = "^5.4.2"
    data["devDependencies"]["babel-loader"]      = "^5.1.0"
    data["devDependencies"]["css-loader"]        = "^0.12.1"
    data["devDependencies"]["jest-cli"]          = "^0.4.2"
    data["devDependencies"]["jshint"]            = "^2.7.0"
    data["devDependencies"]["node-libs-browser"] = "^0.5.0"
    data["devDependencies"]["style-loader"]      = "^0.12.2"
    data["devDependencies"]["stylus-loader"]     = "^1.1.1"
    data["devDependencies"]["webpack"]           = "^1.9.6"

    data["jest"]                                = data["jest"] || {}
    data["jest"]["scriptPreprocessor"]          = "<rootDir>/preprocessor.js"
    data["jest"]["testFileExtensions"]          = [ "es6", "js", "jsx" ]
    data["jest"]["moduleFileExtensions"]        = [ "js", "json", "es6", "jsx" ]
    data["jest"]["unmockedModulePathPatterns"]  = ["./node_modules"]

    // save package
    data = JSON.stringify(data, null, 2) + '\n'
    return fs.writeFile(saveTarget, data)
  }).then(function() {
    return shell.exec('nvm install && nvm use && npm install')
  })
  .catch(function(err) {
    console.error(err)
  })
}
