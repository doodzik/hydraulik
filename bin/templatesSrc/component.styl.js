module.exports = function (name) {
  const content =
  `

  `
  return {
    target:  `components/${name}/${name}.styl`,
    content: content(name)
  }
}
