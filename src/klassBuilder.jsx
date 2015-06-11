import ObserverSet    from './observerSet'
import ObserverSubset from './observerSubset'

export var filterSplit = function(array, fun) {
  var resTrue  = [],
      resFalse = [],
      len      = array.length
  array.forEach(val => (fun(val)) ? resTrue.push(val) : resFalse.push(val))
  return [resTrue, resFalse]
}

export var isBaseSet = function (sets) {
  return function(set) {
    return !(sets[set].schema.baseSet)
  }
}

export var setStoreOfSubset = function (sets, set) {
  set.set   = sets[set.schema.baseSet.name].set.set
  set.error = sets[set.schema.baseSet.name].set.error
}

export default function (sets, dispatcher) {
  var keys = Object.keys(sets)
  var [baseSets, subSets] = filterSplit(keys, isBaseSet(sets))

  baseSets.forEach(set => sets[set] = new ObserverSet(sets[set], dispatcher))

  subSets.forEach(set => {
    let _set      = sets[set],
        baseEvent = sets[_set.schema.baseSet.name].events // uses baseSet events
    setStoreOfSubset(sets, _set)
    sets[set] = new ObserverSubset(_set, dispatcher, baseEvent)
  })

  return sets
}
