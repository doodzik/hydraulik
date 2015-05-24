jest.dontMock '../schema'
jest.dontMock '../store'

Schema  = require('../schema')
Store   = require('../store')

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
