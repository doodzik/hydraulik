export default class Update {
  constructor(schemaName){
    this.crudType   = 'update'
    this.actionType = schemaName + '_UPDATE'
  }

  matches(actionType){
    return actionType == this.actionType
  }
  
  exists(){
    return true
  }
}
