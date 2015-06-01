'use strict';

var content = '\n#!/bin/bash\n\nif [ "$(uname)" == "Darwin" ]; then\n  # Do something under Mac OS X platform\n  source $(brew --prefix nvm)/nvm.sh\nfi\n\n# npm run webpack -- --progress --colors --watch &\n./node_modules/.bin/webpack --progress --colors --watch &\nnvm run server.js\n';

module.exports = function (name) {
  return {
    target: 'bin/startup.sh',
    content: content
  };
};