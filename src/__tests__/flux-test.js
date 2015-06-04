jest.dontMock('../flux')
jest.dontMock('../flux-base')

var Flux       = require('../flux'),
    Set      = require('../set'),
    EventSet = require('../EventSet'),
    assign     = require('object-assign')

describe('Flux', function() {
  it('#new takes an set instance and a dispatcher instance', function() {
    var dispatcher, flux
    dispatcher = {
      register: jest.genMockFn()
    }
    flux = new Flux(Set, dispatcher)
    expect(flux.set).toEqual(Set)
    expect(flux.dispatcher.register).toBeCalledWith(flux.register)
  })

  describe("#register", function() {
    var action, dispatcher, calls, flux, set
    set = new Set()
    set.actionType = 'hello'
    dispatcher = {
      register: jest.genMockFn()
    }
    action = {
      actionType: 'hello',
      argObj: ''
    }
    it('calls set.create when actionType matches', function() {
      set.validate.mockReturnValue(true)
      flux = new Flux(set, dispatcher)
      flux.register(action)
      expect(flux.set.create).not.toBeCalledWith(action.argObj)
      expect(flux.events.emitError).toBeCalled()
    })

    it('dosnt call set.create when actionType dosnt match', function() {
      set.validate.mockReturnValue(false)
      flux = new Flux(set, dispatcher)
      calls = EventSet.emitError.mock.calls
      flux.register(action)
      expect(flux.set.create).toBeCalledWith(action.argObj)
      expect(flux.events.emitError.mock.calls).toEqual(calls)
    })
  })
})
