jest.dontMock('../schema')
jest.dontMock('../store')
jest.autoMockOff()

var Schema = require('../schema'),
    Store = require('../store'),
    Str = require('../types/str')

describe('Store', function() {
  it('#new sets the schema and init store', function() {
    var schema, store
    schema = new Schema('Name')
    store = new Store(schema)
    expect(store.schema).toEqual(schema)
    expect(store.store).toEqual([])
  })

  it('#read returns the store', function() {
    var store
    store = new Store(new Schema('Name'))
    expect(store.read()).toEqual([])
    store.store = 'hello'
    expect(store.read()).toEqual('hello')
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
    pit('fullfills', function() {
      return store.validate({
        Str: 'long enought'
      }).then(function() {
        return expect(true).toBeTruthy()
      }).catch(function() {
        return expect(false).toBeTruthy()
      })
    })

    pit('rejects', function() {
      return store.validate({
        Str: ''
      }).then(function() {
        return expect(false).toBeTruthy()
      }).catch(function() {
        return expect(true).toBeTruthy()
      })
    })
  })
})
