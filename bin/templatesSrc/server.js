const content = `
var koa          = require('koa'),
    app          = koa(),
    path         = require('path'),
    staticCache  = require('koa-static-cache')

var isProduction = process.env.NODE_ENV === 'production',
    port         = isProduction ? 8080 : 3000,
    maxAge       = isProduction ? 365 * 24 * 60 * 60 : 0

// logger
app.use(function *(next){
  var start = new Date()
  yield next
  var ms = new Date() - start
  console.log('%s %s - %s', this.method, this.url, ms)
})

app.use(staticCache(path.join(__dirname, 'public'), { maxAge: maxAge }))

app.listen(port)
`

module.exports = function (name) {
  return {
    target: 'server',
    content: content
  }
}
