module.exports = function(yargs) {
  var pDir  = process.cwd(),
      argv  = yargs
              .demand(2, 'must provide a set name')
              .argv
              // capitalize str
      name  = argv._[1].charAt(0).toUpperCase() + string.slice(1),
      set   = require(pDir + '/bin/templates/set.js')(name)

  fs.writeFile(pDir + '/' + set.target, set.content, function(err, _v){
    if(err)
      console.error(err)
  })
}
