import BasicSet from './basic-set.jsx'

export default class Set extends BasicSet{
  constructor(schema) {
    super(schema)
    this.set   = {}
  }

  read(props){
    return this.set;
  }

  create(args){
    for (var a in args) {
      if (args.hasOwnProperty(a))
        this.set[a] = args[a]
    }
  }

  update(query, args){
    this.create(args)
  }

  destroy(query){
    for (var key in this.set) {
      if (this.set.hasOwnProperty(key))
        this.set[key] = null
    }
  }
}
