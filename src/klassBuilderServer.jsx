import Builder      from './klassBuilder'
import ServerSet    from './serverSet'
import ServerSubset from './serverSubset'

export var setFn = function(set) {
  return new ServerSet(set)
}

export var subsetFn = function (set, baseSet) {
  set.set   = sets[set.baseSet].set.set
  set.error = sets[set.baseSet].set.error
  return new ServerSubset(set)
}

export default function (sets) {
  return Builder(sets, setFn, subsetFn)
}

