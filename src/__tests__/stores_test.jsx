jest.autoMockOff()

var Schema = require('../schema'),
    Store  = require('../store'),
    Stores = require('../stores'),
    Str    = require('hydraulik-types').Str

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

  it('#buildSubsets subset and mainSet share the same store', function() {
    var schema  = new Schema('Name').type(Str)
    var schema2 = new Schema('Name2').subset(schema)
    var stores  = new Stores(Store)
    stores.register(schema)
    stores.register(schema2)
    stores.buildSubsets()
    stores.stores.Name2.store.push('foo')
    stores.stores.Name.store.push('bar')
    expect(stores.stores.Name2.store).toEqual(stores.stores.Name.store)
  })
})
