export default class Fluxes {
  constructor(storesBuild) {
    this.fluxes   = {}
    this.setsBase = storesBuild.baseSets
    this.setsSub  = storesBuild.subSets


    // this.fluxes     = foreach storesBase init flux and saves it into {}
    for (store in this.setsBase) {
      if (!this.stores.hasOwnProperty(store)) continue
      _store = this.setsBase[store]
      this.fluxes[store] = new Flux(_store, this.dispatcher)
    }

    // this.fluxes     = foreach storesSub  extend from flux parent flux and saves it into {}
    for (store in this.setsSub) {
      if (!this.stores.hasOwnProperty(store)) continue
      _store    = this.setsSub[store]
      baseEvent = this.fluxes[_store.subsetOf.name].events
      this.fluxes[store] = new Flux(_store, this.dispatcher, baseEvent)
    }
  }
}
