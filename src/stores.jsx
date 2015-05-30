export default class Stores {
  constructor(store) {
    this.stores = {}
    this.store  = store
  }

  register(schema) {
    this.stores[schema.name] = new this.store(schema)
    return this
  }
}
