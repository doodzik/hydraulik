import Type from '../type'

export default class StrError extends Type {
  constructor(value, options = {}){
    super(value, options)
    this.length = value.length
  }

  validation(){
    if (this.length != 0)
      return 'StrError: value should be of length 0'
  }
}
