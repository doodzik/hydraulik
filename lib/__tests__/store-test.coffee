jest.dontMock '../schema'
jest.dontMock '../store'
jest.autoMockOff()

Schema  = require('../schema')
Store   = require('../store')
Str     = require('../types/str')

describe 'Store', ->
  it '#new sets the schema and init store', ->
    schema = new Schema('Name')
    store  = new Store(schema)
    expect(store.schema).toEqual schema
    expect(store.store).toEqual []

  it '#read returns the store', ->
    store  = new Store(new Schema('Name'))
    expect(store.read()).toEqual []
    store.store = 'hello'
    expect(store.read()).toEqual 'hello'

  it '#create returns the store', ->
    store  = new Store(new Schema('Name'))
    expect(store.store).toEqual []
    store.create({ name: 'hello' })
    expect(store.store).toEqual [{ name: 'hello' }]

  describe "#validate", ->
    schema = new Schema('Name')
    schema.type(Str)
    store  = new Store(schema)
    pit 'fullfills', ->
      store.validate({Str: 'long enought'})
      .then(-> expect(true).toBeTruthy())
      .catch(-> expect(false).toBeTruthy())
    pit 'rejects', ->
      store.validate({Str: ''})
      .then(-> expect(false).toBeTruthy())
      .catch(-> expect(true).toBeTruthy())
