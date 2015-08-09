import ObserverSubset from './observerSubset'

export default class ObserverSet extends ObserverSubset {
  constructor(...args) {
    super(...args)
    this.dispatcher.register(this.register.bind(this))
  }

  register(action){
    if(this.baseSet.actionTypeCreate == action.actionType){
      if (!this.baseSet.validate(action.argObj)) {
        this.baseSet.create(action.argObj)
        this.events.emitChange()
      } else {
        this.events.emitError()
      }
    } else if(this.baseSet.actionTypeUpdate == action.actionType){
      if (!this.baseSet.validate(action.argObj)) {
        this.baseSet.update(action.argObj, action.query)
        this.events.emitChange()
      } else {
        this.events.emitError()
      }
    } else if(this.baseSet.actionTypeDestroy == action.actionType){
      this.baseSet.destroy(action.query)
      this.events.emitChange()
    }
  }
}
