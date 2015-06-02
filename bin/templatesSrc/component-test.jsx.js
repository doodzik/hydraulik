module.exports = function (name) {
  const nameUpper = name.charAt(0).toUpperCase() + name.slice(1)
  const content =
  `
  console.log('hi test for ${name}')
  `
  return {
    target:  `components/${name}/__tests__/${name}-test.jsx`,
    content: content
  }
}
