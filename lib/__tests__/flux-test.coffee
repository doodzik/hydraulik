jest.dontMock '../flux'

Flux       = require('../flux')
Store      = require('../store')
EventStore = require('../EventStore')

describe 'Flux', ->
  it '#new takes an store instance and a dispatcher instance', ->
    dispatcher = { register: jest.genMockFn() }
    flux = new Flux(Store, dispatcher)
    expect(flux.store).toEqual Store
    expect(flux.dispatcher.register).toBeCalledWith(flux.register)

  describe "#register", ->
    dispatcher = { register: jest.genMockFn() }
    action     = { actionType: 'hello', argObj: '' }
    it 'calls store.create when actionType matches', ->
      store = new Store()
      store.actionType = 'hello'
      flux = new Flux(store, dispatcher)
      flux.register(action)
      expect(flux.store.create).toBeCalledWith(action.argObj)
      expect(flux.events.emitChange).toBeCalled()

    it 'dosnt call store.create when actionType dosnt match', ->
      store = new Store()
      store.actionType = 'hallo'
      flux = new Flux(store, dispatcher)
      calls = EventStore.emitChange.mock.calls
      flux.register(action)
      expect(flux.store.create).not.toBeCalledWith(action.argObj)
      expect(flux.events.emitChange.mock.calls).toEqual(calls)

  it '#create', ->
    dispatcher = { dispatch: jest.genMockFn(), register: jest.genMockFn() }
    store = new Store()
    store.actionType = 'actionType'
    flux = new Flux(store, dispatcher)
    flux.create 'argObj'
    expect(flux.dispatcher.dispatch).toBeCalledWith
       actionType: 'actionType',
       argObj: 'argObj'
