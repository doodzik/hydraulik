export default class Stores {
  constructor(store) {
    this.stores = {}
    this.store  = store
  }

  register(schema) {
    this.stores[schema.name] = new this.store(schema)
    return this
  }

  buildSubsets() {
    var _store
    for (store in this.stores) {
      if (!this.stores.hasOwnProperty(store)) continue
      _store = this.stores[store]
      if (!_store.schema.subsetOf) continue
      _store.store = this.stores[_store.schema.subsetOf.name].store
    }
  }
}
