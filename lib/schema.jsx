export default class Schema {
  constructor(name) {
    this.name     = name
    this.types    = []
  }

  type(type) {
    this.types.push({
      type: type,
      name: type.name
    })
    return this
  }

  as(name) {
    this.types[this.types.length-1].name = name
    return this
  }
}
