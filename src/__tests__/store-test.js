jest.autoMockOff()

var Schema = require('../schema'),
    Store  = require('../store'),
    Str    = require('hydraulik-types').Str

describe('Store', function() {
  it('#new sets the schema and init store', function() {
    var schema, store
    schema = new Schema('Name')
    store = new Store(schema)
    expect(store.schema).toEqual(schema)
  })

  it('#read returns the store', function() {
    var store = new Store(new Schema('Name'))
    expect(store.read()).toEqual([])
    store.store = ['hello']
    expect(store.read()).toEqual(['hello'])
  })

  it('#read filters elements', function() {
    var schema      = new Schema('Name')
    schema.filterFn = jest.genMockFn()
                      .mockReturnValueOnce(false)
                      .mockReturnValueOnce(true)
                      .mockReturnValueOnce(false)
    var store       = new Store(schema)
    store.store     = ['hello', 'huhuhu', 'beubte']
    expect(store.read()).toEqual(['huhuhu'])
  })

  it('#create returns the store', function() {
    var store
    store = new Store(new Schema('Name'))
    expect(store.store).toEqual([])
    store.create({
      name: 'hello'
    })
    expect(store.store).toEqual([
      {
        name: 'hello'
      }
    ])
  })

  describe("#validate", function() {
    var schema, store
    schema = new Schema('Name')
    schema.type(Str)
    store = new Store(schema)
    it('fullfills', function() {
      expect(store.validate({
        Str: 'long enought'
      })).toEqual(false)
    })

   it('rejects', function() {
      expect(store.validate({
        Str: ''
      })).toEqual(true)
    })
  })
})
