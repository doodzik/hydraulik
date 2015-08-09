import BasicSet from './basic-set.jsx'

export default class Set extends BasicSet {
  constructor(schema) {
    super(schema)
    this.set               = []
  }

  read(props){
    var res     = []
        len     = this.set.length >>> 0,
        matched = 0,
        skip    = (this.schema.skip === true) ? (props.skip || 0) : this.schema.skip,
        limit   = (this.schema.limit === true) ? (props.limit || 0) : this.schema.limit

    for (var i = 0; i < len; i++) {
      if (i in this.set) {
        var val       = this.set[i]
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

  create(arg){
    this.set.push(arg)
  }

  update(query, args){
    this.set.forEach((set) => {
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

  destroy(query){
    var len    = this.set.length >>> 0,
        i      = 0,
        toSkip = false,
        set

    while (i < len) {
      toSkip = false
      set = this.set[i]
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
        this.set.splice(i, 1)
        len--
      }
    }
  }
}
