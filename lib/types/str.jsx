import Type from '../type'

export default class Str extends Type {
  constructor(value){
    super(value)
    this.length = value.length
    this.min = 1
    this.max = 128
  }

  validate(){
    if (this.length < this.min)
      throw new Error('Str is too short')
    if (this.length > this.max)
      throw new Error('Str is too long')
  }
}
