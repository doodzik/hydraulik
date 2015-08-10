import ObserverSubset from './observerSubset'

export default class ObserverSet extends ObserverSubset {
  constructor(...args) {
    super(...args)
    this.dispatcher.register(this.register.bind(this))
  }

  register(action){
    let actionType = action.actionType
    if(this.baseSet.actionTypeCreate == actionType)
      this.triggerCreate(action.argObj)
    else if(this.baseSet.actionTypeUpdate == actionType)
      this.triggerUpdate(action.argObj, action.query)
    else if(this.baseSet.actionTypeDestroy == actionType)
      this.triggerDestroy(action.query)
  }

  triggerCreate(argObj){
    let presetArg = this.set.preset(argObj)
    if (!this.baseSet.validate(presetArg)) {
      this.baseSet.create(presetArg)
      this.events.emitChange()
    } else {
      this.events.emitError()
    }
  }

  triggerUpdate(argObj, query){
    let presetArg   = this.set.preset(argObj)
    let presetQuery = this.set.preset(query)
    if (!this.baseSet.validate(presetArg)) {
      this.baseSet.update(presetArg, presetQuery)
      this.events.emitChange()
    } else {
      this.events.emitError()
    }
  }

  triggerDestroy(query){
    let presetQuery = this.set.preset(query)
    this.baseSet.destroy(presetQuery)
    this.events.emitChange()
  }
}
