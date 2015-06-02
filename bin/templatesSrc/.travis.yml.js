const content = `
language: node_js
node_js:
  - "0.10"
`

module.exports = function (name) {
  return {
    target: '.travis.yml',
    content: content
  }
}
