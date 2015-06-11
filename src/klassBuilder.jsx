import ObserverSet    from './observerSet'
import ObserverSubset from './observerSubset'

var compare = function (sets) {
  return function(setA, setB) {
    if (sets[setA].schema.baseSet)
      return 1
    return 0
  }
}

export var sortedKeys = function (sets) {
  var keys = Object.keys(sets)
  return keys.sort(compare(sets))
}

export var setStoreOfSubset = function (sets, set) {
  set.set   = sets[set.schema.baseSet.name].set.set
  set.error = sets[set.schema.baseSet.name].set.error
}

export default function (sets, dispatcher) {
  sortedKeys(sets).forEach(set => {
    let _set      = sets[set],
        baseEvent

    if (!_set.schema.baseSet)
      sets[set] = new ObserverSet(_set, dispatcher)
    else {
      setStoreOfSubset(sets, _set)
      baseEvent = sets[_set.schema.baseSet.name].events // uses baseSet events
      sets[set] = new ObserverSubset(_set, dispatcher, baseEvent)
    }
  })
  return sets
}
