jest.dontMock('../flux')
jest.dontMock('../flux-base')

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
})
