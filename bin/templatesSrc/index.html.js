module.exports = function (name) {
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
    target: 'public/index.html',
    content: content)(name)
  }
}
