import Str from './str'

export default class StrError extends Str {
  constructor(value){
    super(value)
    this.min = 0
    this.max = 0
  }
}
