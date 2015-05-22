export default class Create {
  constructor(schemaName){
    this.crudType   = 'create'
    this.actionType = schemaName + '_CREATE'
  }

  matches(actionType){
    return actionType == this.actionType
  }

  exists(){
    return true
  }
}
