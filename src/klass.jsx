import ObserverSet    from './observerSet'
import ObserverSubset from './observerSubset'
import build          from './klassBuilder'
import { Dispatcher } from 'flux'

export default class Klass {
  constructor() {
    this.dispatcher = new Dispatcher()
    this._sets      = {}
    this._build     = false
  }

  push(Schema) {
    var schema = new Schema()
    this._sets[schema.name] = new schema.set(Schema)
    return this
  }

  get sets(){
    if (!this._build)
      this._build = build(this._sets, this.dispatcher)
    return this._build
  }
}
