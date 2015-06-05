jest.dontMock('../observerSet')
jest.dontMock('../observerSubset')

var ObserverSet       = require('../observerSet'),
    Set        = require('../set'),
    setEvents  = require('../setEvents'),
    assign     = require('object-assign')

describe('ObserverSet', function() {
  it('#new takes an set instance and a dispatcher instance', function() {
    var dispatcher, observerSet
    dispatcher = {
      register: jest.genMockFn()
    }
    observerSet = new ObserverSet(Set, dispatcher)
    expect(observerSet.set).toEqual(Set)
    expect(observerSet.dispatcher.register).toBeCalledWith(observerSet.register)
  })

  describe("#register", function() {
    var action, dispatcher, calls, observerSet, set
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
      observerSet = new ObserverSet(set, dispatcher)
      observerSet.register(action)
      expect(observerSet.set.create).not.toBeCalledWith(action.argObj)
      expect(observerSet.events.emitError).toBeCalled()
    })

    it('dosnt call set.create when actionType dosnt match', function() {
      set.validate.mockReturnValue(false)
      observerSet = new ObserverSet(set, dispatcher)
      calls = setEvents.emitError.mock.calls
      observerSet.register(action)
      expect(observerSet.set.create).toBeCalledWith(action.argObj)
      expect(observerSet.events.emitError.mock.calls).toEqual(calls)
    })
  })
})
