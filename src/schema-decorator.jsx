import _ from 'lodash'

export var type = function (type, name = false, preset = null) {
   return function decorator(target) {
      target.prototype.types = target.prototype.types || []
      name         = name || type.name.toLowerCase()

      let elmIndex = _.findIndex(target.prototype.types, { name })

      if(elmIndex == -1)
        target.prototype.types.push({ type, name, preset })
      else
        _.merge(target.prototype.types[elmIndex], { preset })
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


