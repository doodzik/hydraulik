import Set from './set'

export default class Klass {
  constructor() {
    this.sets     = {}
    this.baseSets = {}
    this.subSets  = {}
  }

  push(schema) {
    this.sets[schema.name] = new Set(schema)
    return this
  }

  build(){
    this.buildSubsets()
    this.splitIntoBaseAndSubSets()
    return this
  }

  // makes that the baseSet and subSets use the same storage
  buildSubsets() {
    var _set
    for (var set in this.sets) {
      if (!this.sets.hasOwnProperty(set)) continue
      _set       = this.sets[set]
      if (!_set.schema.baseSet) continue
      _set.set   = this.sets[_set.schema.baseSet.name].set
      _set.error = this.sets[_set.schema.baseSet.name].error
    }
  }

  splitIntoBaseAndSubSets(){
    var _set
    for (var set in this.sets) {
      if (!this.sets.hasOwnProperty(set)) continue
      _set = this.sets[set]
      if (_set.schema.baseSet)
        this.subSets[_set.name]  = _set
      else
        this.baseSets[_set.name] = _set
    }
  }
}
