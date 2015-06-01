module.exports = function (name) {
  const content =
  `
  console.log('hi test for ${name}')
  `
  return {
    target:  `components/${name}/${name}-test.jsx`,
    content: content(name)
  }
}
