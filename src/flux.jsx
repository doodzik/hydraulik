import FluxBase from './flux-base'

export default class Flux extends FluxBase {
  constructor(...args) {
    super(...args)
    this.dispatcher.register(this.register.bind(this))
  }

  register(action){
    if(this.baseStore.actionType == action.actionType){
      if (!this.baseStore.validate(action.argObj)) {
        this.baseStore.create(action.argObj)
        this.events.emitChange()
      } else {
        this.events.emitError()
      }
    }
  }
}
