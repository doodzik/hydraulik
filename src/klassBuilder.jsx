import { split } from './array'

export var isBaseSet = function (sets) {
  return function(set) {
    return !(sets[set].baseSet)
  }
}

export default function (sets, setFn, subsetFn) {
  var keys = Object.keys(sets)
  var [baseSets, subSets] = split(keys, isBaseSet(sets))

  baseSets.forEach(set => sets[set] = setFn(sets[set]))
  subSets.forEach(set  => sets[set] = subsetFn(sets[set], sets[sets[set].baseSet]))

  return sets
}
