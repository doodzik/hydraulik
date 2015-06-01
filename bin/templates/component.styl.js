"use strict";

module.exports = function (name) {
  var content = "\n\n  ";
  return {
    target: "components/" + name + "/" + name + ".styl",
    content: content(name)
  };
};