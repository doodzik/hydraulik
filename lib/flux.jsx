import EventStore from './EventStore'
import assign from 'object-assign'

export default class Flux {
  constructor(store, dispatcher) {
    this.store      = store
    this.dispatcher = dispatcher
    this.events     = assign({}, EventStore)
    dispatcher.register(this.register.bind(this))
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

  mixin(){
    var _this = this
    var onChangeFn = '_' + this.store.name + '_change'
    var obj = {
      getInitialState: function() {
        return _this.getStateObj()
      },

      componentDidMount: function() {
        _this.events.addChangeListener(this[onChangeFn]);
      },

      componentWillUnmount: function() {
        _this.events.removeChangeListener(this[onChangeFn]);
      }
    }

    obj[onChangeFn] = function() {
       this.setState(_this.getStateObj());
    }

    return obj
  }
}
