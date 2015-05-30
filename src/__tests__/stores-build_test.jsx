jest.autoMockOff()

var Schema      = require('../schema'),
    Store       = require('../store'),
    Stores      = require('../stores'),
    Str         = require('hydraulik-types').Str,
    StoresBuild = require('../stores-build')

describe('StoresBuild', function() {
  it('#buildSubsets subset and mainSet share the same store', function() {
    var schema  = new Schema('Name').type(Str)
    var schema2 = new Schema('Name2').subset(schema)
    var stores  = new Stores(Store)
    stores.register(schema)
    stores.register(schema2)
    var storesBuild  = new StoresBuild(stores)
    storesBuild.stores.Name2.create('foo')
    storesBuild.stores.Name.create('bar')
    storesBuild.stores.Name.error['bar'] = 'baz'
    expect(stores.stores.Name2.store).toEqual(stores.stores.Name.store)
    expect(stores.stores.Name2.error).toEqual(stores.stores.Name.error)
  })

  it('#splitIntoBaseAndSubSets', function() {
    var schema  = new Schema('Name').type(Str)
    var schema2 = new Schema('Name2').subset(schema)
    var stores  = new Stores(Store)
    stores.register(schema)
    stores.register(schema2)
    var storesBuild  = new StoresBuild(stores)
    expect(stores.stores.Name2).toEqual(storesBuild.subSets.Name2)
    expect(stores.stores.Name).toEqual(storesBuild.baseSets.Name)
  })
})
