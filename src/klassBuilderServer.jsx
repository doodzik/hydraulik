import Builder      from './klassBuilder'
import ServerSet    from './serverSet'

export var setFn = set => new ServerSet(set)

export var subsetFn = function (set, baseSet) {
  set.set   = sets[set.baseSet].set.set
  set.error = sets[set.baseSet].set.error
  return new ServerSet(set)
}

export default function (sets) {
  return Builder(sets, setFn, subsetFn)
}

// export default sets => Builder(sets, setFn, subsetFn)
