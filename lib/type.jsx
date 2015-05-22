export default class Type{
  constructor(value){
    this.value = value
  }

  validate(){}

  getClassName() {
    return this.name;
  }
}
