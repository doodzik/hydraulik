import { StrError } from 'hydraulik-types'

export default class Set {
  constructor(schema) {
    this.schema     = schema
    this.set        = []
    this.error      = {}
    this.name       = schema.name
    this.actionType = this.name + '_CREATE'
  }

  read(props){
    return this.set.filter((val) => {
      val['props'] = props
      returnVal    = this.schema.filterFn(val)
      delete val['props']
      return returnVal
    })
  }

  create(arg){
    this.set.push(arg)
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
