jest.dontMock '../flux'

Flux       = require('../flux')
assign     = require('object-assign')
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

  it '#getStateObj', ->
    dispatcher = { dispatch: jest.genMockFn(), register: jest.genMockFn() }
    store = new Store()
    store.name = 'Name'
    store.read.mockReturnValue('value')
    flux = new Flux(store, dispatcher)
    expect(flux.getStateObj()).toEqual
      Name: 'value'

  describe '#mixin', ->
    dispatcher = { dispatch: jest.genMockFn(), register: jest.genMockFn() }
    store = new Store()
    store.name = 'Name'
    store.read.mockReturnValue('value')
    flux = new Flux(store, dispatcher)
    it '#getInitialState', ->
      mixin = flux.mixin()
      expect(mixin.getInitialState()).toEqual flux.getStateObj()

    it '#componentDidMount', ->
        _this = { setState: jest.genMockFn() }
        mixin = flux.mixin()
        assign(_this, mixin).componentDidMount()
        expect(flux.events.addChangeListener).toBeCalledWith mixin._onChange

    it '#componentWillUnmount', ->
        _this = { setState: jest.genMockFn() }
        mixin = flux.mixin()
        assign(_this, mixin).componentWillUnmount()
        expect(flux.events.removeChangeListener).toBeCalledWith mixin._onChange

    it '#_onChange', ->
      _this = { setState: jest.genMockFn() }
      mixin = flux.mixin()
      assign(_this, mixin)._onChange()
      expect(_this.setState).toBeCalledWith flux.getStateObj()
