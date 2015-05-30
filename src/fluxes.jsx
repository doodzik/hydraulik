
export default class Fluxes {
  constructor(storesBuild) {
    this.setsBase = storesBuild.baseSets
    this.setsSub  = storesBuild.subSets
    // this.fluxes     = foreach storesBase init flux and saves it into {}
    // this.fluxes     = foreach storesSub  extend from flux parent flux and saves it into {}
  }
}
