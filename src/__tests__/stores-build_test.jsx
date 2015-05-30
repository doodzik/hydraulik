jest.autoMockOff()

var Schema      = require('../schema'),
    Store       = require('../store'),
    Stores      = require('../stores'),
    StoresBuild = require('../stores-build')

describe('StoresBuild', function() {
  it('#buildSubsets subset and mainSet share the same store', function() {
    var schema  = new Schema('Name').type(Str)
    var schema2 = new Schema('Name2').subset(schema)
    var stores  = new Stores(Store)
    stores.register(schema)
    stores.register(schema2)
    var storesBuild  = new StoresBuild(stores)
    storesBuild.stores.Name2.store.push('foo')
    storesBuild.stores.Name.store.push('bar')
    expect(stores.stores.Name2.store).toEqual(stores.stores.Name.store)
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
