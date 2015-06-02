"use strict";

module.exports = function (name) {
  var nameUpper = name.charAt(0).toUpperCase() + name.slice(1);
  var content = "\n\n  ";
  return {
    target: "components/" + name + "/" + name + ".styl",
    content: content
  };
};