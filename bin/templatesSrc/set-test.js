module.exports = function (name) {
  const nameUpper = name.charAt(0).toUpperCase() + name.slice(1)
  const content =
  `
  <html>
    <head>
      <title>${name}</title>
    </head>
    <body>
      <div id="content"></div>
      <script type="text/javascript" src="assets/js/bundle.js" charset="utf-8"></script>
    </body>
  </html>
  `
  return {
    target:  `sets/__tests__/${name}-test.js`,
    content: content
  }
}
