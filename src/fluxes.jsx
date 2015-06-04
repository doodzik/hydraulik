import Flux      from './flux'
import FluxBase  from './flux-base'
import { Dispatcher } from 'flux'

export default class Fluxes {
  constructor(setsBuild) {
    this.fluxes     = {}
    this.dispatcher = new Dispatcher()
    this.setsBase   = setsBuild.baseSets
    this.setsSub    = setsBuild.subSets
    this.setBaseSets()
    this.setSubSets()
  }

  setBaseSets(){
    for (var set in this.setsBase) {
      if (!this.setsBase.hasOwnProperty(set)) continue
      this.fluxes[set] = new Flux(this.setsBase[set], this.dispatcher)
    }
  }

  setSubSets(){
    var _set, baseEvent
    for (var set in this.setsSub) {
      if (!this.setsSub.hasOwnProperty(set)) continue
      _set    = this.setsSub[set]
      baseEvent = this.fluxes[_set.schema.subsetOf.name].events
      this.fluxes[set] = new FluxBase(_set, this.dispatcher, baseEvent)
    }
  }
}
