export default class SetsBuild {
  constructor(sets) {
    this.sets = sets.sets
    this.baseSets = {}
    this.subSets  = {}
    this.buildSubsets()
    this.splitIntoBaseAndSubSets()
  }

  // makes that the baseSet and subSets use the same storage
  buildSubsets() {
    var _set
    for (var set in this.sets) {
      if (!this.sets.hasOwnProperty(set)) continue
      _set = this.sets[set]
      if (!_set.schema.subsetOf) continue
      _set.set = this.sets[_set.schema.subsetOf.name].set
      _set.error = this.sets[_set.schema.subsetOf.name].error
    }
  }

  splitIntoBaseAndSubSets(){
    var _set
    for (var set in this.sets) {
      if (!this.sets.hasOwnProperty(set)) continue
      _set = this.sets[set]
      if (_set.schema.subsetOf)
        this.subSets[_set.name]  = _set
      else
        this.baseSets[_set.name] = _set
    }
  }
}
