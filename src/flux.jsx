import FluxBase from './flux-base'

export default class Flux extends FluxBase {
  constructor(...args) {
    super(...args)
    this.dispatcher.register(this.register.bind(this))
  }

  register(action){
    if(this.baseSet.actionType == action.actionType){
      if (!this.baseSet.validate(action.argObj)) {
        this.baseSet.create(action.argObj)
        this.events.emitChange()
      } else {
        this.events.emitError()
      }
    }
  }
}
