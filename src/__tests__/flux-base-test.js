jest.dontMock('../flux-base')

var FluxBase   = require('../flux-base'),
    Store      = require('../store'),
    EventStore = require('../EventStore'),
    assign     = require('object-assign')

describe('FluxBase', function() {
  it('#create', function() {
    var dispatcher, flux, store
    dispatcher = {
      dispatch: jest.genMockFn(),
      register: jest.genMockFn()
    }
    store = new Store()
    store.actionType = 'actionType'
    flux = new FluxBase(store, dispatcher)
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
      flux = new FluxBase(store, dispatcher)
      expect(flux.getStateObj()).toEqual({
        Name: 'value'
      })
    })

    it('#getStateObjError', function() {
      flux = new FluxBase(store, dispatcher)
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
    flux = new FluxBase(store, dispatcher)
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
    flux = new FluxBase(store, dispatcher)
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
