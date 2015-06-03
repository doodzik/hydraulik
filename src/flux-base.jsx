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
    this.dispatcher.dispatch({ actionType, argObj })
  }

  getStateObj(props){
    return { [this.store.name]: this.store.read(props) }
  }

  getStateObjError(){
    return { [this.store.name + 'Error']: this.store.error }
  }

  mixin(){
    var _this = this
    var onChangeFn = '_' + this.baseStore.name + '_change'
    return {
      getInitialState() {
        return _this.getStateObj(this.props)
      },

      componentDidMount() {
        _this.events.addChangeListener(this[onChangeFn]);
      },

      componentWillUnmount() {
        _this.events.removeChangeListener(this[onChangeFn]);
      },

      [onChangeFn]() {
         this.setState(_this.getStateObj(this.props));
      }
    }
  }

  mixinError(){
    var _this = this
    var onErrorFn = '_' + this.baseStore.name + '_error'
    return {
      getInitialState() {
        return _this.getStateObjError()
      },

      componentDidMount() {
        _this.events.addErrorListener(this[onErrorFn]);
      },

      componentWillUnmount() {
        _this.events.removeErrorListener(this[onErrorFn]);
      },

      [onErrorFn]() {
         this.setState(_this.getStateObjError());
      }
    }
  }
}
