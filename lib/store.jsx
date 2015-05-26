import Promise  from 'bluebird'
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
    return Promise.reduce(this.schema.types, (typeErrors, type) => {
      return Promise.try(() => {
        new type.type(arg[type.name]).validate()
        return ''
      })
      .catch((e) => {
        return e.message
      })
      .then((message) => {
        typeErrors[type.name] = message
        return typeErrors
      })
    }, {}).then((typeErrors) => {
      this.error = typeErrors
      for (var key in typeErrors)
        typeErrors.hasOwnProperty(key) && new StrError(typeErrors[key]).validate()
      return typeErrors
    })
  }
}
