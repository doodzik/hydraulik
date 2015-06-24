import { StrError } from 'hydraulik-types'

export default class Set {
  constructor(schema) {
    schema          = new schema()
    this.schema     = schema
    this.set        = []
    this.baseSet    = schema.baseSet
    this.default    = []
    this.error      = {}
    this.name       = schema.name
    this.actionType = this.name + '_CREATE'
  }

  read(props){
    var res     = []
        len     = this.set.length >>> 0,
        matched = 0,
        skip    = (this.schema.skip === true) ? (props.skip || 0) : this.schema.skip,
        limit   = (this.schema.limit === true) ? (props.limit || 0) : this.schema.limit

    for (var i = 0; i < len; i++) {
      if (i in this.set) {
        var val       = this.set[i]
        val['props']  = props
        var returnVal = this.schema.filter(val)
        if (returnVal) {
          matched++
          if(!skip || matched > skip) {
            if(limit !== 1)
              res.push(val)
            else
              res = val
          }
        }
        delete val['props']
        if(limit && limit == matched)
          break
      }
    }
    return res;
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
