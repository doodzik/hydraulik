import assign     from 'object-assign'
import EventStore from './EventStore'

export default class Store {
  constructor(schema, dispatcher){
    this.events     = assign({}, EventStore)
    this.schema     = schema
    this.store      = []
    dispatcher.register(registerFn)
    this.dispatcher = dispatcher
  }

  registerFn(action){
    if(this.schema.Create.matches(action.actionType))
      triggerCreate(action.argObj)
    else if(this.schema.Update.matches(action.actionType))
      triggerUpdate(action.argObj)
    else if(this.schema.Destroy.matches(action.actionType))
      triggerDestroy(action.argObj)
  }

  create(argObj){
    this.dispatcher.dispatch({
      actionType: this.schema.Create.actionType,
      argObj: argObj
    })
  }

  update(argObj){
    this.dispatcher.dispatch({
      actionType: this.schema.Update.actionType,
      argObj: argObj
    })
  }

  destroy(argObj){
    this.dispatcher.dispatch({
      actionType: this.schema.Destroy.actionType,
      argObj: argObj
    })
  }

  read(){
    this.schema.Read.run()
  }

  triggerCreate(argObj){
    this.schema.Create.run(this.store, argObj);
    this.events.emitChange();
  }

  triggerUpdate(argObj){
    this.schema.Update.run(this.store, argObj);
    this.events.emitChange();
  }

  triggerDestroy(argObj){
    this.schema.Destroy.run(this.store, argObj);
    this.events.emitChange();
  }

  mixin(){
    _this = this
    var obj = {
        getInitialState: function() {
          let obj = {}
          obj[_this.schema.name] = _this.read()
          return obj
        },

        componentDidMount: function() {
          _this.events.addChangeListener(this._onChange);
        },

        componentWillUnmount: function() {
          _this.events.removeChangeListener(this._onChange);
        },

        _onChange: function() {
          let obj = {}
          obj[_this.schema.name] = _this.read()
          this.setState(obj);
        }
      }
    return obj
  }
}
