import Set from './set'

export var type = function (type, name = false) {
   return function decorator(target) {
      target.types = target.types || []
      name         = name || type.name.toLowerCase()
      target.types.push({ type, name })
      return target
   }
}

export var skip = function(val) {
   return function decorator(target, name, descriptor) {
      target.skip = (typeof val === 'undefined') ? true : val
      return descriptor
   }
}

export default class Schema {
  constructor() {
    this.name = this.constructor.name.toLowerCase()
    this.set  = Set
    this.skip = this.skip || false
    this.setBaseSet()
  }

  filter(val) {
    return true
  }

  get types (){
    return this.constructor.types
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

