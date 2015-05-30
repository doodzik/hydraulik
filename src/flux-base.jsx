import EventStore from './EventStore'
import assign from 'object-assign'

export default class FluxBase {
  constructor(store, dispatcher, events = assign({}, EventStore)) {
    this.store      = store
    this.dispatcher = dispatcher
    this.events     = events
    this.baseStore  = this.store.subsetOf || this.store
  }

  create(argObj){
    var actionType = this.baseStore.actionType
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

  getStateObjError(){
    var obj = {}
    obj[this.store.name + 'Error'] = this.store.error
    return obj
  }

  mixin(){
    var _this = this
    var onChangeFn = '_' + this.baseStore.name + '_change'
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

  mixinError(){
    var _this = this
    var onErrorFn = '_' + this.baseStore.name + '_error'
    var obj = {
      getInitialState: function() {
        return _this.getStateObjError()
      },

      componentDidMount: function() {
        _this.events.addErrorListener(this[onErrorFn]);
      },

      componentWillUnmount: function() {
        _this.events.removeErrorListener(this[onErrorFn]);
      }
    }

    obj[onErrorFn] = function() {
       this.setState(_this.getStateObjError());
    }

    return obj
  }
}
