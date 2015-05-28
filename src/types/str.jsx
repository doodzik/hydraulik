import Type from '../type'

export default class Str extends Type {
  constructor(value, options = {}){
    super(value, options)
    this.length = value.length
    this.min = 1
    this.max = 128
  }

  validation(){
    if (this.length < this.min)
      return 'Str is too short'
    if (this.length > this.max)
      return 'Str is too long'
  }
}
