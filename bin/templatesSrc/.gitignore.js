const content = `
# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# node-waf configuration
.lock-wscript

# Compiled binary addons (http://nodejs.org/api/addons.html)
build/Release

# Dependency directory
# https://docs.npmjs.com/misc/faq#should-i-check-my-node-modules-folder-into-git
node_modules

public/assets/js/bundle.js

npm-debug.log
`

module.exports = function (name) {
  return {
    target: '.gitignore',
    content: content
  }
}
