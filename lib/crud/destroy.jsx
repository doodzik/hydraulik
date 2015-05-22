export default class Destroy {
  constructor(schemaName){
    this.crudType   = 'destroy'
    this.actionType = schemaName + '_DESTROY'
  }

  matches(actionType){
    return actionType == this.actionType
  }
  
  exists(){
    return true
  }
}
