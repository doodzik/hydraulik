const content = `
#!/bin/bash

if [ "$(uname)" == "Darwin" ]; then
  # Do something under Mac OS X platform
  source $(brew --prefix nvm)/nvm.sh
fi

# npm run webpack -- --progress --colors --watch &
./node_modules/.bin/webpack --progress --colors --watch &
nvm run server.js
`

module.exports = function (name) {
  return {
    target: 'bin/startup.sh',
    content: content
  }
}
