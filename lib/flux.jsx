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

  getStateObj(){
    var obj = {}
    obj[this.store.name] = this.store.read()
    return obj
  }

  mixin(__this){
    var _this = this
    return {
      getInitialState: function() {
        return _this.getStateObj()
      },

      componentDidMount: function() {
        _this.events.addChangeListener(__this._onChange);
      },

      componentWillUnmount: function() {
        _this.events.removeChangeListener(__this._onChange);
      },

      _onChange: function() {
        __this.setState(_this.getStateObj());
      }
    }
  }
}
