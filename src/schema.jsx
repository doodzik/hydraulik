import Set    from './set'
import assign from 'object-assign'
import _      from 'lodash'

export var type = function (type, name = false, preset = null) {
   return function decorator(target) {
      target.types = target.types || []
      name         = name || type.name.toLowerCase()

      let elmIndex = _.findIndex(target.types, { name })

      if(elmIndex == -1)
        target.types.push({ type, name, preset })
      else
        target.types[elmIndex] = assign(target.types[elmIndex], { type, name, preset })
      return target
   }
}

export var skip = function(val) {
   return function decorator(target, name, descriptor) {
      target.skip = (typeof val === 'undefined') ? true : val
      return descriptor
   }
}

export var limit = function(val) {
   return function decorator(target, name, descriptor) {
      target.limit = val
      return descriptor
   }
}

export default class Schema {
  constructor() {
    this.name  = this.constructor.name.toLowerCase()
    this.set   = Set
    this.skip  = this.skip  || 0
    this.limit = this.limit || 0
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

