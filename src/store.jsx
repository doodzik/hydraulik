import { StrError } from 'hydraulik-types'

export default class Store {
  constructor(schema) {
    this.schema     = schema
    this.store      = []
    this.error      = {}
    this.name       = schema.name
    this.actionType = this.name + '_CREATE'
    this.filterFn   = (_val) => { return true }
  }

  // DSL
  filter(filterFn){
    this.filterFn = filterFn
    return this
  }

  // Implementation
  read(){
    return this.store.filter(this.filterFn)
  }

  create(arg){
    this.store.push(arg)
  }

  // return true if no error else falso
  validate(arg: Object): Boolean {
    var isValid = true
    this.error = this.schema.types.reduce((typeErrors, type) => {
        var typeInstance = new type.type(arg[type.name])
        typeErrors[type.name] = typeInstance.validate()
        isValid = new StrError(typeInstance).isValid()
        return typeErrors
    }, {})
    return isValid
  }
}
