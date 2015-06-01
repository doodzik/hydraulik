'use strict';

var content = '\n// var React  = require("react");\n// var Router = require("react-router");\n// import { routes } from \'./components/router.jsx\';\n//\n// // Router.run(routes, Router.HistoryLocation, function (Handler) {\n//   // React.render(<Handler />, document.getElementById(\'content\'));\n// // });\n//\n// Router.run(routes, function (Handler) {\n//   React.render(<Handler />, document.getElementById(\'content\'));\n// })\n//\n// // Router.run(routes, function (Handler, state) {\n//   // var params = state.params;\n//   // React.render(<Handler params={params}/>, document.body);\n// // });\n';

module.exports = function (name) {
  return {
    target: 'client.js',
    content: content
  };
};