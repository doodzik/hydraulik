'use strict';

module.exports = function (name) {
  var content = '\n  <html>\n    <head>\n      <title>' + name + '</title>\n    </head>\n    <body>\n      <div id="content"></div>\n      <script type="text/javascript" src="assets/js/bundle.js" charset="utf-8"></script>\n    </body>\n  </html>\n  ';
  return {
    target: 'public/index.html',
    content: content(name)
  };
};