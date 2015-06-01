"use strict";

module.exports = function (name) {
  var content = "\n  console.log('hi test for " + name + "')\n  ";
  return {
    target: "components/" + name + "/" + name + "-test.jsx",
    content: content(name)
  };
};