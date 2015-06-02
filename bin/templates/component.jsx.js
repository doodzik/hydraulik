"use strict";

module.exports = function (name) {
  var nameUpper = name.charAt(0).toUpperCase() + name.slice(1);
  var content = "\n  console.log('hi " + name + "')\n  ";
  return {
    target: "components/" + name + "/" + name + ".jsx",
    content: content
  };
};