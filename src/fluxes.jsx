import Flux      from './flux'
import FluxBase  from './flux-base'

export default class Fluxes {
  constructor(storesBuild, dispatcher) {
    this.fluxes     = {}
    this.dispatcher = dispatcher
    this.setsBase   = storesBuild.baseSets
    this.setsSub    = storesBuild.subSets
    this.setBaseSets()
    this.setSubSets()
  }

  setBaseSets(){
    for (store in this.setsBase) {
      if (!this.setsBase.hasOwnProperty(store)) continue
      this.fluxes[store] = new Flux(this.setsBase[store], this.dispatcher)
    }
  }

  setSubSets(){
    var _store, baseEvent
    for (store in this.setsSub) {
      if (!this.setsSub.hasOwnProperty(store)) continue
      _store    = this.setsSub[store]
      baseEvent = this.fluxes[_store.schema.subsetOf.name].events
      this.fluxes[store] = new FluxBase(_store, this.dispatcher, baseEvent)
    }
  }
}
