export default class Client {
  constructor(schema, dispatcher){
    this.schema     = schema
    dispatcher.register(registerFn)
    this.dispatcher = dispatcher
  }

  registerFn(action){
    if(this.schema.Create.matches(action.actionType))
      triggerCreate(action.argObj)
    else if(this.schema.Update.matches(action.actionType))
      triggerCreate(action.argObj)
    else if(this.schema.Destroy.matches(action.actionType))
      triggerDestroy(action.argObj)
  }

  if (this.schema.Create.exists) {
    create(argObj){
      this.dispatcher.dispatch({
        actionType: this.schema.Create.actionType,
        argObj: argObj
      })
    }
  }

  if (this.schema.Update.exists) {
    update(argObj){
      this.dispatcher.dispatch({
        actionType: this.schema.Update.actionType,
        argObj: argObj
      })
    }
  }

  if (this.schema.Destroy.exists) {
    destroy(argObj){
      this.dispatcher.dispatch({
        actionType: this.schema.Destroy.actionType,
        argObj: argObj
      })
    }
  }

  triggerCreate(argObj){
    // create(action.text.trim());
    // Store.emitChange();
  }

  triggerUpdate(argObj){
    // update(action.token);
    // Store.emitChange();
  }

  triggerDestroy(argObj){
    // destroy();
    // Store.emitChange();
  }
}
