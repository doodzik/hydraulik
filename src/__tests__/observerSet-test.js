jest.dontMock('../observerSet')
jest.dontMock('../observerSubset')

var ObserverSet = require('../observerSet'),
    Set         = require('../set'),
    setEvents   = require('../setEvents'),
    assign      = require('object-assign')

describe('ObserverSet', function() {
  it('#new takes an set instance and a dispatcher instance', function() {
    var dispatcher  = { register: jest.genMockFn() },
        observerSet = new ObserverSet(Set, dispatcher)
    expect(observerSet.set).toEqual(Set)
    expect(observerSet.dispatcher.register).toBeCalledWith(observerSet.register)
  })

  describe("#register", function() {
    var observerSet, calls
    var dispatcher    = { register: jest.genMockFn() },
        actionCreate  = { actionType: 'Create', argObj: '' },
        actionUpdate  = { actionType: 'Update', argObj: '', query: ''},
        actionDestroy = { actionType: 'Destroy', query: '' },
        set           = new Set()
    set.actionTypeCreate  = 'Create'
    set.actionTypeUpdate  = 'Update'
    set.actionTypeDestroy = 'Destroy'

    it('#create calls set.create when actionType matches', function() {
      set.validate.mockReturnValue(true)
      observerSet = new ObserverSet(set, dispatcher)
      observerSet.register(actionCreate)
      expect(observerSet.set.create).not.toBeCalledWith(actionCreate.argObj)
      expect(observerSet.events.emitError).toBeCalled()
    })

    it('#update calls set.update when actionType matches', function() {
      set.validate.mockReturnValue(true)
      observerSet = new ObserverSet(set, dispatcher)
      observerSet.register(actionUpdate)
      expect(observerSet.set.create).not.toBeCalledWith(actionUpdate.query, actionUpdate.argObj)
      expect(observerSet.events.emitError).toBeCalled()
    })

    it('#destroy calls set.destroy when actionType matches', function() {
      set.validate.mockReturnValue(true)
      observerSet = new ObserverSet(set, dispatcher)
      observerSet.register(actionDestroy)
      expect(observerSet.set.create).not.toBeCalledWith(actionDestroy.query)
      expect(observerSet.events.emitError).toBeCalled()
    })

    it('dosnt call set.create when actionType dosnt match', function() {
      set.validate.mockReturnValue(false)
      observerSet = new ObserverSet(set, dispatcher)
      calls = setEvents.emitError.mock.calls
      observerSet.register(actionCreate)
      expect(observerSet.set.create).toBeCalledWith(actionCreate.argObj)
      expect(observerSet.events.emitError.mock.calls).toEqual(calls)
    })
  })
})
