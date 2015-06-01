"use strict";

module.exports = function (name) {
  var content = "\n  console.log('hi " + name + "')\n  ";
  return {
    target: "components/" + name + "/" + name + ".jsx",
    content: content(name)
  };
};