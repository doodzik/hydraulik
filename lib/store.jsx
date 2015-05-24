export default class Store {
  constructor(schema) {
    this.schema = schema
    this.store  = []
  }

  read(){
    return this.store
  }

  create(arg){
    this.store.push(arg)
  }
}
