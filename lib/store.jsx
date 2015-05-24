export default class Store {
  constructor(schema) {
    this.schema = schema
    this.store  = []
    this.name   = schema.name
    this.actionType = this.name + '_CREATE'
  }

  read(){
    return this.store
  }

  create(arg){
    this.store.push(arg)
  }
}
