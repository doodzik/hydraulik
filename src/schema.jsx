export default class Schema {
  constructor(name) {
    this.name     = name
    this.types    = []
    this.filterFn = (_val) => { return true }
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

  filter(filterFn){
    this.filterFn = filterFn
    return this
  }
}
