module.exports = function (name) {
  const content =
  `
  console.log('hi test for ${name}')
  `
  return {
    target:  `components/${name}/__tests__/${name}-test.jsx`,
    content: content(name)
  }
}
