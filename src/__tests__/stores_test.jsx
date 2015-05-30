jest.dontMock('../schema')
jest.dontMock('../store')
jest.dontMock('../stores')

var Schema = require('../schema'),
    Store  = require('../store'),
    Stores = require('../stores')

describe('Stores', function() {
  it('#new sets the schema and init store', function() {
    var stores = new Stores('foo')
    expect(stores.store).toEqual('foo')
    expect(stores.stores).toEqual({})
  })

  it('#register', function() {
    var schema = new Schema('Name')
    var store  = new Store(schema)
    var stores = new Stores(Store)
    stores.register(schema)
    expect(stores.stores.Name).toEqual(store)
  })
})
