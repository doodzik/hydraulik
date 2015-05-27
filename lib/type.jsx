export default class Type{
  constructor(value){
    this.value = value
  }

  validate(){
    return this.validation() || ''
  }

  getClassName() {
    return this.name;
  }
}
