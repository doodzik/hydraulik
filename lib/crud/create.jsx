export default class Create {
  constructor(schema){
    this.crudType   = 'create'
    this.actionType = schema.name + '_CREATE'
  }

  matches(actionType){
    return actionType == this.actionType
  }

  exists(){
    return true
  }

  run(store, argObj) {

  }
}
