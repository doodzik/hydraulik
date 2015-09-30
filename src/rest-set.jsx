import Error    from 'hydraulik-types/lib/error'
import BasicSet from 'src/basic-set'

var fnDefault = (err, res) => res

export default class RESTSet extends BasicSet{
  constructor(schema) {
    super(schema)
  }

  get (query, fn = fnDefault) {
    return request
    .get(`/${this.name}`)
    .send({ query })
    .end(fn)
  }

  post (arg, fn = fnDefault) {
    return request
    .post(`/${this.name}`)
    .send({ args })
    .end(fn)
  }

  put (args, query, fn = fnDefault) {
    return request
    .put(`/${this.name}`)
    .send({ args, query })
    .end(fn)
  }

  del (query, fn = fnDefault) {
    return request
    .del(`/${this.name}`)
    .send({ query })
    .end(fn)
  }
}

