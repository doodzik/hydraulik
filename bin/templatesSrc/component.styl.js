module.exports = function (name) {
  const nameUpper = name.charAt(0).toUpperCase() + name.slice(1)
  const content =
  `

  `
  return {
    target:  `components/${name}/${name}.styl`,
    content: content
  }
}
