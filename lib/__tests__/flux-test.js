// jsx because of Object.assign
jest.dontMock('../flux')

var Flux       = require('../flux'),
    Store      = require('../store'),
    EventStore = require('../EventStore'),
    assign     = require('object-assign')

describe('Flux', function() {
  it('#new takes an store instance and a dispatcher instance', function() {
    var dispatcher, flux
    dispatcher = {
      register: jest.genMockFn()
    }
    flux = new Flux(Store, dispatcher)
    expect(flux.store).toEqual(Store)
    expect(flux.dispatcher.register).toBeCalledWith(flux.register)
  })

  describe("#register", function() {
    var action, dispatcher, calls, flux, store
    store = new Store()
    store.actionType = 'hello'
    dispatcher = {
      register: jest.genMockFn()
    }
    action = {
      actionType: 'hello',
      argObj: ''
    }
    it('calls store.create when actionType matches', function() {
      store.validate.mockReturnValue(true)
      flux = new Flux(store, dispatcher)
      flux.register(action)
      expect(flux.store.create).not.toBeCalledWith(action.argObj)
      expect(flux.events.emitError).toBeCalled()
    })

    it('dosnt call store.create when actionType dosnt match', function() {
      store.validate.mockReturnValue(false)
      flux = new Flux(store, dispatcher)
      calls = EventStore.emitError.mock.calls
      flux.register(action)
      expect(flux.store.create).toBeCalledWith(action.argObj)
      expect(flux.events.emitError.mock.calls).toEqual(calls)
    })
  })

  it('#create', function() {
    var dispatcher, flux, store
    dispatcher = {
      dispatch: jest.genMockFn(),
      register: jest.genMockFn()
    }
    store = new Store()
    store.actionType = 'actionType'
    flux = new Flux(store, dispatcher)
    flux.create('argObj')
    expect(flux.dispatcher.dispatch).toBeCalledWith({
      actionType: 'actionType',
      argObj: 'argObj'
    })
  })

  describe('getStateObj', function() {
    var dispatcher, flux, store
    dispatcher = {
      dispatch: jest.genMockFn(),
      register: jest.genMockFn()
    }
    store = new Store()
    store.name = 'Name'
    store.error = { foo: 'bar' }
    store.read.mockReturnValue('value')
    it('#getStateObj', function() {
      flux = new Flux(store, dispatcher)
      expect(flux.getStateObj()).toEqual({
        Name: 'value'
      })
    })

    it('#getStateObjError', function() {
      flux = new Flux(store, dispatcher)
      expect(flux.getStateObjError()).toEqual({
        NameError: { foo: 'bar' }
      })
    })
  })

  describe('#mixin', function() {
    var dispatcher, flux, store
    dispatcher = {
      dispatch: jest.genMockFn(),
      register: jest.genMockFn()
    }
    store = new Store()
    store.name = 'Name'
    store.read.mockReturnValue('value')
    flux = new Flux(store, dispatcher)
    it('#getInitialState', function() {
      var mixin
      mixin = flux.mixin()
      expect(mixin.getInitialState()).toEqual(flux.getStateObj())
    })

    it('#componentDidMount', function() {
      var _this, mixin
      _this = {
        setState: jest.genMockFn()
      }
      mixin = flux.mixin()
      assign(_this, mixin).componentDidMount()
      expect(flux.events.addChangeListener).toBeCalledWith(mixin._onChange)
    })

    it('#componentWillUnmount', function() {
      var _this, mixin
      _this = {
        setState: jest.genMockFn()
      }
      mixin = flux.mixin()
      assign(_this, mixin).componentWillUnmount()
      expect(flux.events.removeChangeListener).toBeCalledWith(mixin._onChange)
    })

    it('onChange method', function() {
      var _this, mixin
      _this = {
        setState: jest.genMockFn()
      }
      mixin = flux.mixin()
      assign(_this, mixin)._Name_change()
      expect(_this.setState).toBeCalledWith(flux.getStateObj())
    })
  })

  describe('#mixinError', function() {
    var dispatcher, flux, store
    dispatcher = {
      dispatch: jest.genMockFn(),
      register: jest.genMockFn()
    }
    store = new Store()
    store.name = 'Name'
    store.error = { name: 'hi' }
    flux = new Flux(store, dispatcher)
    it('#getInitialState', function() {
      var mixin
      mixin = flux.mixinError()
      expect(mixin.getInitialState()).toEqual(flux.getStateObjError())
    })

    it('#componentDidMount', function() {
      var _this, mixin
      _this = {
        setState: jest.genMockFn()
      }
      mixin = flux.mixinError()
      assign(_this, mixin).componentDidMount()
      expect(flux.events.addErrorListener).toBeCalledWith(mixin._onChange)
    })

    it('#componentWillUnmount', function() {
      var _this, mixin
      _this = {
        setState: jest.genMockFn()
      }
      mixin = flux.mixinError()
      assign(_this, mixin).componentWillUnmount()
      expect(flux.events.removeErrorListener).toBeCalledWith(mixin._onChange)
    })

    it('onError method', function() {
      var _this, mixin
      _this = {
        setState: jest.genMockFn()
      }
      mixin = flux.mixinError()
      assign(_this, mixin)._Name_error()
      expect(_this.setState).toBeCalledWith(flux.getStateObjError())
    })
  })
})
