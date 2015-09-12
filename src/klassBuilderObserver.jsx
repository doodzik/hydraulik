import Builder        from './klassBuilder'
import ObserverSet    from './observerSet'
import ObserverSubset from './observerSubset'

export var setFn = function(dispatcher) {
  return set => new ObserverSet(set, dispatcher)
}

export var subsetFn = function (dispatcher) {
  return (set, baseSet) => {
    set.set   = baseSet.set.set
    set.error = baseSet.set.error
    return new ObserverSubset(set, dispatcher, baseSet.events)
  }
}

export default function (sets, dispatcher) {
  return Builder(sets, setFn(dispatcher), subsetFn(dispatcher))
}
