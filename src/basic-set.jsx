import Error from 'hydraulik-types/lib/error'

export default class BasicSet {
  constructor(schema) {
    schema                 = new schema()
    this.schema            = schema
    this.baseSet           = schema.baseSet
    this.name              = schema.name
    this.error             = {}
    this.actionTypeCreate  = this.name + '_CREATE'
    this.actionTypeUpdate  = this.name + '_UPDATE'
    this.actionTypeDestroy = this.name + '_DESTROY'
  }

  validateUpdate(arg: Object): Boolean {
    var isValid = true
    this.error = this.schema.types.reduce((typeErrors, type) => {

        var name         = type.name
        if(arg[name] === undefined || arg[name] === null)
          return typeErrors
        var typeInstance = new type.type(arg[name], {name})
        typeErrors[type.name] = typeInstance.validate()
        isValid = new Error(typeInstance).isValid()
        return typeErrors
    }, {})
    return isValid
  }

  validateCreate(arg: Object): Boolean {
    var isValid = true
    this.error = this.schema.types.reduce((typeErrors, type) => {
        var name         = type.name,
            typeInstance = new type.type(arg[name], {name})
        typeErrors[type.name] = typeInstance.validate()
        isValid = new Error(typeInstance).isValid()
        return typeErrors
    }, {})
    return isValid
  }

  preset(arg: Object): Object {
    return this.schema.types.reduce((argPreset, type) => {
        var name     = type.name,
            preset   = type.preset,
            argValue = arg[name],
            value    = (argValue === undefined || argValue === null) ? preset : argValue
        if (value !== undefined && value !== null)
          argPreset[name] = value
        return argPreset
    }, {})
  }
}

