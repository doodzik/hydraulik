module.exports = function (name) {
  const content =
  `
  console.log('hi ${name}')
  `
  return {
    target:  `components/${name}/${name}.jsx`,
    content: content(name)
  }
}
