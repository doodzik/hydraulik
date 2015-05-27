import StrError from './types/str-error'

export default class Store {
  constructor(schema) {
    this.schema = schema
    this.store  = []
    this.error  = {}
    this.name   = schema.name
    this.actionType = this.name + '_CREATE'
  }

  read(){
    return this.store
  }

  create(arg){
    this.store.push(arg)
  }

  // TODO: shorten this method
  validate(arg) {
    typeErrors = this.schema.types.reduce((typeErrors, type) => {
        typeErrors[type.name] = new type.type(arg[type.name]).validate()
        return typeErrors
    }, {})
    this.error = typeErrors
    for (var key in typeErrors) {
      if (typeErrors.hasOwnProperty(key) && new StrError(typeErrors[key]).validate().length > 0)
        return true
      else
        return false
    }
  }
}
