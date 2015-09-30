import RESTSet from './rest-set'

export default class Set extends RESTSet {
  constructor(schema) {
    super(schema)
    this.set         = []
    this.set_server  = []
  }

  read(props) {
    return this.get(props)
  }

  read_server(props){
    var res     = [],
        len     = this.set_server.length >>> 0,
        matched = 0,
        skip    = (this.schema.skip === true) ? (props.skip || 0) : this.schema.skip,
        limit   = (this.schema.limit === true) ? (props.limit || 0) : this.schema.limit

    for (var i = 0; i < len; i++) {
      if (i in this.set_server) {
        var val       = this.set_server[i]
        val['props']  = props
        var returnVal = this.schema.filter(val)
        if (returnVal) {
          matched++
          if(!skip || matched > skip) {
            if(limit !== 1)
              res.push(val)
            else
              res = val
          }
        }
        delete val['props']
        if(limit && limit == matched)
          break
      }
    }
    return res;
  }

  create(arg) {
    return this.create(arg)
  }

  create_server(arg){
    this.set_server.push(arg)
  }

  update(args, query) {
    return this.put(args, query)
  }

  update_server(args, query){
    this.set_server.forEach((set) => {
      for (var q in query) {
        if (query.hasOwnProperty(q)) {
          if(query[q] !== set[q])
            return false
        }
      }
      for (var a in args) {
        if (args.hasOwnProperty(a))
          set[a] = args[a]
      }
    })
  }

  destroy(props) {
    return this.del(query)
  }

  destroy_server(query){
    var len    = this.set_server.length >>> 0,
        i      = 0,
        toSkip = false,
        set

    while (i < len) {
      toSkip = false
      set = this.set_server[i]
      for (var q in query) {
        if (query.hasOwnProperty(q)) {
          if(query[q] != set[q]) {
            toSkip = true
            break
          }
        }
      }
      if(toSkip) {
        i++
      } else {
        this.set_server.splice(i, 1)
        len--
      }
    }
  }
}
