export default class StoresBuild {
  constructor(stores) {
    this.stores = stores.stores
    this.baseSets = {}
    this.subSets  = {}
    this.buildSubsets()
    this.splitIntoBaseAndSubSets()
  }

  // makes that the baseSet and subSets use the same storage
  buildSubsets() {
    for (store in this.stores) {
      if (!this.stores.hasOwnProperty(store)) continue
      _store = this.stores[store]
      if (!_store.schema.subsetOf) continue
      _store.store = this.stores[_store.schema.subsetOf.name].store
      _store.error = this.stores[_store.schema.subsetOf.name].error
    }
  }

  splitIntoBaseAndSubSets(){
    var _store
    for (store in this.stores) {
      if (!this.stores.hasOwnProperty(store)) continue
      _store = this.stores[store]
      if (_store.schema.subsetOf)
        this.subSets[_store.name]  = _store
      else
        this.baseSets[_store.name] = _store
    }
  }
}
