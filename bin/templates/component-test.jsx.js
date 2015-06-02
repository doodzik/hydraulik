"use strict";

module.exports = function (name) {
  var nameUpper = name.charAt(0).toUpperCase() + name.slice(1);
  var content = "\n  console.log('hi test for " + name + "')\n  ";
  return {
    target: "components/" + name + "/__tests__/" + name + "-test.jsx",
    content: content
  };
};