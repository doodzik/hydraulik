class BaseType {
  constructor(value, options = {}){
    this.value     = value
    this.options   = options
    this.name      = options.name || this.constructor.name
    this.valiValue = false
  }

  validation(){
    return ''
  }

  validationWithoutSuper(){
    return ''
  }

  validate(){
    if(this.valiValue)
      return this.valiValue
    this.valiValue = this.validationWithoutSuper() || ''
    return this.valiValue
  }

  isValid(){
    return this.validate().length == 0
  }

  getName() {
    return this.name;
  }
}

export default class Type extends BaseType {
  constructor(value, options = {}){
    super(value, options)
  }

  validationWithoutSuper(){
    var _this         = this.constructor
    var _super        = Object.getPrototypeOf(_this)
    var superInstance = new _super(this.value, this.options)
    if(superInstance.isValid())
      return this.validation() || ''
    return superInstance.validation()
  }
}
