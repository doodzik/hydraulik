export default class ServerSet {
  constructor(set) {
    this.set   = set
    this.toUse = [ 'create', 'read', 'update', 'destroy' ]
  }

   get create(){
    return _.post(`/${this.set.name}`, function(next) * {
      var args  = this.req.body.args,
          body  = this.set.create_server(args)
      this.body = JSON.stringify(body)
      next()
    })
  }

  get read(){
    return _.get(`/${this.set.name}`, function(next) * {
      var query = this.req.body.query,
          body  = this.set.read_server(query)
      this.body = JSON.stringify(body)
      next()
    })
  }

  get update(){
    return _.put(`/${this.set.name}`, function(next) * {
      var query = this.req.body.query,
          args  = this.req.body.args,
          body  = this.set.update_server(args, query)
      this.body = JSON.stringify(body)
      next()
    })
  }

  get destroy(){
    return _.del(`/${this.set.name}`, function(next) * {
      var query = this.req.body.query,
          body  = this.set.destroy_server(query)
      this.body = JSON.stringify(body)
      next()
    })
  }
}

