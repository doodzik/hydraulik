import Create   from './crud/create'
import Read     from './crud/read'
import Update   from './crud/update'
import Destroy  from './crud/destroy'
import NullCrud  from './crud/null'

export default class Schema {
  constructor(name) {
    this.name     = name
    this.types    = []
    this.Create, this.Read, this.Update, this.Destroy = new NullCrud()
  }

  type(type) {
    this.types.push({
      type: type,
      name: type.name
    })
    return this
  }

  as(name) {
    this.types[this.types.length-1].name = name
    return this
  }

  create(cb){
    this.Create = new Create(this)
    if(typeof(cb) == 'function')
      cb(this.Create)
    return this
  }

  read(cb){
    this.Read = new Read(this)
    if(typeof(cb) == 'function')
      cb(this.Read)
    return this
  }

  update(cb){
    this.Update = new Update(this)
    if(typeof(cb) == 'function')
      cb(this.Update)
    return this
  }

  destroy(cb){
    this.Destroy = new Destroy(this)
    if(typeof(cb) == 'function')
      cb(this.Destroy)
    return this
  }
}
