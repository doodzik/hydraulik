export var split = function(array, fun) {
  var resTrue  = [],
      resFalse = [],
      len      = array.length
  array.forEach(val => (fun(val)) ? resTrue.push(val) : resFalse.push(val))
  return [resTrue, resFalse]
}
