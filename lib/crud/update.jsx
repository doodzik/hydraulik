export default class Update {
  constructor(schema){
    this.crudType   = 'update'
    this.actionType = schema.name + '_UPDATE'
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
