export default class Sets {
  constructor(set) {
    this.sets = {}
    this.set  = set
  }

  register(schema) {
    this.sets[schema.name] = new this.set(schema)
    return this
  }
}
