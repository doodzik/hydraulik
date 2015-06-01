const content = `
{
  "esnext": true,
  "asi": true
}
`

module.exports = function (name) {
  return {
    target: '.jshintrc'
    content: content,
  }
}
