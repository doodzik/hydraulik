export default class Schema {
  constructor(name) {
    this.name           = name
    this.types          = []
    this.subsetOf       = false
    this.filterFn       = (_val) => { return true }
    this.filterOriginal = (_val) => { return true } // if filterFn is overwritten keep the original filter around
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
    this.filterFn       = filterFn
    this.filterOriginal = filterFn
    return this
  }

  //TODO change to subsetOf
  subset(parentSet) {
    this.subsetOf = this._getMainSet(parentSet)
    this.filterFn = this._getFilterComposition(parentSet)
    return this
  }

  _getFilterComposition(parentSet) {
    return (val) => { return parentSet.filterFn(val) && this.filterOriginal(val) }
  }

  _getMainSet(parentSet) {
    while (parentSet.subsetOf)
      parentSet = parentSet.subsetOf
    return parentSet
  }
}
