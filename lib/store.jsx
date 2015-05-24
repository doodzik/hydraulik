export default class Store {
  constructor(schema) {
    this.schema = schema
    this.store  = []
    this.actionType = schema.name + '_CREATE'
  }

  read(){
    return this.store
  }

  create(arg){
    this.store.push(arg)
  }
}
