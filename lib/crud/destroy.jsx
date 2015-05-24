export default class Destroy {
  constructor(schema){
    this.crudType   = 'destroy'
    this.actionType = schema.name + '_DESTROY'
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
