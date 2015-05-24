import assign     from 'object-assign'
import EventStore from './EventStore'

export default class Flux {
  constructor(store, dispatcher) {
    this.store      = store
    this.dispatcher = dispatcher
    this.events     = assign({}, EventStore)
    dispatcher.register(this.register)
  }

  register(action){
    if(this.store.actionType == action.actionType){
      this.store.create(action.argObj)
      this.events.emitChange()
    }
  }

  create(argObj){
    var actionType = this.store.actionType
    this.dispatcher.dispatch({
      actionType: actionType,
      argObj: argObj
    })
  }

}
