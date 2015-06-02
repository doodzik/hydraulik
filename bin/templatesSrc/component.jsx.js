module.exports = function (name) {
  const nameUpper = name.charAt(0).toUpperCase() + name.slice(1)
  const content =
  `
  console.log('hi ${name}')
  `
  return {
    target:  `components/${name}/${name}.jsx`,
    content: content
  }
}
