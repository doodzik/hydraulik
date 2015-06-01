const content = `
// var React  = require("react");
// var Router = require("react-router");
// import { routes } from './components/router.jsx';
//
// // Router.run(routes, Router.HistoryLocation, function (Handler) {
//   // React.render(<Handler />, document.getElementById('content'));
// // });
//
// Router.run(routes, function (Handler) {
//   React.render(<Handler />, document.getElementById('content'));
// })
//
// // Router.run(routes, function (Handler, state) {
//   // var params = state.params;
//   // React.render(<Handler params={params}/>, document.body);
// // });
`

module.exports = function (name) {
  return {
    target: 'client.js',
    content: content
  }
}
