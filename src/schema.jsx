import Set    from './set'
export *      from './schema-decorator'

export default class Schema {
  constructor() {
    this.name  = this.constructor.name.toLowerCase()
    this.set   = this.set   || Set
    this.skip  = this.skip  || 0
    this.limit = this.limit || 0
    this.setBaseSet()
  }

  filter(val) {
    return true
  }

  setBaseSet() {
    var _this  = this.constructor,
        _super = Object.getPrototypeOf(_this)

    while(_super != Schema && _this != Schema) {
      _this  = _super
      _super = Object.getPrototypeOf(_this)
    }

    this.baseSet = (_this == this.constructor) ? false : new _this().name
  }
}

