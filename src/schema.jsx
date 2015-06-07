export default class Schema {
  constructor(name) {
    this.name           = name.toLowerCase()
    this.types          = []
    this.subsetOf       = false
    this.filterFn       = _val => { return true }
    this.filterOriginal = _val => { return true } // if filterFn is overwritten keep the original filter around
  }

  type(type) {
    var name = type.name.toLowerCase()
    this.types.push({ type, name })
    return this
  }

  as(name) {
    this.types[this.types.length-1].name = name.toLowerCase()
    return this
  }

  filter(filterFn){
    this.filterFn       = filterFn
    this.filterOriginal = filterFn
    return this
  }

  //TODO change to subsetOf
  subset(set) {
    this.subsetOf = this._getBaseSet(set)
    this.filterFn = this._getFilterComposition(set)
    return this
  }

  _getFilterComposition(set) {
    return val => { return set.filterFn(val) && this.filterOriginal(val) }
  }

  //TODO make static
  _getBaseSet(set) {
    while (set.subsetOf)
      set = set.subsetOf
    return set
  }
}
