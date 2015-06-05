import Flux      from './flux'
import ObserverSubset  from './observerSubset'
import { Dispatcher } from 'flux'

export default class ObserverClass {
  constructor(setsBuild) {
    this.sets          = {}
    this.dispatcher    = new Dispatcher()
    this.setsBase      = setsBuild.baseSets
    this.setsSub       = setsBuild.subSets
    this.setBaseSets()
    this.setSubSets()
  }

  setBaseSets(){
    for (var set in this.setsBase) {
      if (!this.setsBase.hasOwnProperty(set)) continue
      this.sets[set] = new Flux(this.setsBase[set], this.dispatcher)
    }
  }

  setSubSets(){
    var _set, baseEvent
    for (var set in this.setsSub) {
      if (!this.setsSub.hasOwnProperty(set)) continue
      _set           = this.setsSub[set]
      baseEvent      = this.observerClass[_set.schema.subsetOf.name].events
      this.sets[set] = new ObserverSubset(_set, this.dispatcher, baseEvent)
    }
  }
}
