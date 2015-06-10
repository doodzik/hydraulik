import ObserverSet    from './observerSet'
import ObserverSubset from './observerSubset'
import { Dispatcher } from 'flux'

export default class Klass {
  constructor() {
    this.dispatcher = new Dispatcher()
    this.baseSets   = {}
    this.subSets    = {}
    this._sets      = {}
    this._build     = false
  }

  push(schema) {
    this._sets[schema.name] = new schema.setType(schema)
    return this
  }

  get sets(){
    if (!this._build)
      this.build()
    return this._build
  }

  //TODO mv everything below into own module NOT A CLASS
  build(){
    this._build = {}
    this.buildSubsets()
    this.splitIntoBaseAndSubSets()
    this.setBaseSets(this.baseSets, this.dispatcher)
    this.setSubSets(this.subSets,   this.dispatcher)
    return this
  }

  // makes that the baseSet and subSets use the same storage
  buildSubsets() {
    var _set
    for (var set in this._sets) {
      if (!this._sets.hasOwnProperty(set)) continue
      _set       = this._sets[set]
      if (!_set.schema.baseSet) continue
      _set.set   = this._sets[_set.schema.baseSet.name].set
      _set.error = this._sets[_set.schema.baseSet.name].error
    }
  }

  splitIntoBaseAndSubSets(){
    var _set
    for (var set in this._sets) {
      if (!this._sets.hasOwnProperty(set)) continue
      _set = this._sets[set]
      if (_set.schema.baseSet)
        this.subSets[_set.name]  = _set
      else
        this.baseSets[_set.name] = _set
    }
  }

  setBaseSets(setsBase, dispatcher){
    for (var set in setsBase) {
      if (!setsBase.hasOwnProperty(set)) continue
      this._build[set] = new ObserverSet(setsBase[set], dispatcher)
    }
  }

  setSubSets(setsSub, dispatcher){
    var _set, baseEvent
    for (var set in setsSub) {
      if (!setsSub.hasOwnProperty(set)) continue
      _set           = setsSub[set]
      baseEvent      = this._build[_set.schema.baseSet.name].events
      this._build[set] = new ObserverSubset(_set, dispatcher, baseEvent)
    }
  }

}
