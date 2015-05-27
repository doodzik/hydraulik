export default class Type {
  constructor(value, options = {}){
    this.value = value
    this.name  = options.name || this.constructor.name
  }

  validation(){
    return ''
  }

  validate(){
    return this.validation() || ''
  }

  isValid(){
    return this.validate().length == 0
  }

  getName() {
    return this.name;
  }
}
