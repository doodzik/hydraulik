import Flux      from './flux'
import FluxBase  from './flux-base'
import { Dispatcher } from 'flux'

export default class ClassObserver {
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
      baseEvent      = this.classObserver[_set.schema.subsetOf.name].events
      this.sets[set] = new FluxBase(_set, this.dispatcher, baseEvent)
    }
  }
}
