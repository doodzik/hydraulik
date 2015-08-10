jest.dontMock('../observerSet')
jest.dontMock('../observerSubset')

var ObserverSet = require('../observerSet'),
    Set         = require('../array-set'),
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
        actionCreate  = { actionType: 'Create',  argObj: '' },
        actionUpdate  = { actionType: 'Update',  argObj: '', query: ''},
        actionDestroy = { actionType: 'Destroy', query: '' },
        set           = new Set()
    set.actionTypeCreate  = 'Create'
    set.actionTypeUpdate  = 'Update'
    set.actionTypeDestroy = 'Destroy'

    it('trigger triggerCreate if actionType == create', function() {
      var observerSet            = new ObserverSet(set, dispatcher)
      observerSet.triggerCreate  = jest.genMockFn()
      observerSet.triggerUpdate  = jest.genMockFn()
      observerSet.triggerDestroy = jest.genMockFn()
      observerSet.register(actionCreate)
      expect(observerSet.triggerCreate).toBeCalledWith(actionCreate.argObj)
      expect(observerSet.triggerDestroy).not.toBeCalled()
      expect(observerSet.triggerUpdate).not.toBeCalled()
    })

    it('trigger triggerUpdate if actionType == update', function() {
      var observerSet            = new ObserverSet(set, dispatcher)
      observerSet.triggerCreate  = jest.genMockFn()
      observerSet.triggerUpdate  = jest.genMockFn()
      observerSet.triggerDestroy = jest.genMockFn()
      observerSet.register(actionUpdate)
      expect(observerSet.triggerUpdate).toBeCalledWith(actionUpdate.argObj, actionUpdate.query)
      expect(observerSet.triggerDestroy).not.toBeCalled()
      expect(observerSet.triggerCreate).not.toBeCalled()
    })

    it('trigger triggerDestroy if actionType == destroy', function() {
      var observerSet            = new ObserverSet(set, dispatcher)
      observerSet.triggerCreate  = jest.genMockFn()
      observerSet.triggerUpdate  = jest.genMockFn()
      observerSet.triggerDestroy = jest.genMockFn()
      observerSet.register(actionDestroy)
      expect(observerSet.triggerDestroy).toBeCalledWith(actionDestroy.query)
      expect(observerSet.triggerUpdate).not.toBeCalled()
      expect(observerSet.triggerCreate).not.toBeCalled()
    })
  })

  describe("#triggerCreate", function() {
    it('creates value if valid', function() {
      var set         = new Set(),
          observerSet = new ObserverSet(set, { register: jest.genMockFn() })
      observerSet.set.validate.mockReturnValue(false)
      observerSet.set.preset.mockReturnValue('bar')
      observerSet.triggerCreate('foo')
      expect(observerSet.set.preset).toBeCalledWith('foo')
      expect(observerSet.set.validate).toBeCalledWith('bar')
      expect(observerSet.baseSet.create).toBeCalledWith('bar')
      expect(observerSet.events.emitChange).toBeCalled()
    })

    it('emits error if invalid', function() {
      var set = new Set()
      set.validate.mockReturnValue(true)
      set.preset.mockReturnValue('bar')
      var observerSet = new ObserverSet(set, { register: jest.genMockFn() })
      observerSet.triggerCreate('foo')
      expect(observerSet.events.emitError).toBeCalled()
    })
  })

  describe("#triggerUpdate", function() {
    it('updates', function() {
      var set = new Set()
      set.validate.mockReturnValue(false)
      set.preset.mockReturnValueOnce('bar')
      set.preset.mockReturnValueOnce('baz')
      var observerSet = new ObserverSet(set, { register: jest.genMockFn() })
      observerSet.triggerUpdate('foo', 'foo2')
      expect(observerSet.baseSet.update).toBeCalledWith('bar', 'baz')
      expect(observerSet.events.emitChange).toBeCalled()
    })

    it('emits error if invalid', function() {
      var set = new Set()
      set.validate.mockReturnValue(true)
      var observerSet = new ObserverSet(set, { register: jest.genMockFn() })
      observerSet.triggerUpdate('foo', 'foo2')
      expect(observerSet.events.emitError).toBeCalled()
    })
  })

  it("#triggerDestroy", function() {
      observerSet = new ObserverSet(new Set(), { register: jest.genMockFn() })
      observerSet.set.preset.mockReturnValue('bar')
      observerSet.triggerDestroy('foo')
      expect(observerSet.set.preset).toBeCalledWith('foo')
      expect(observerSet.baseSet.destroy).toBeCalledWith('bar')
      expect(observerSet.events.emitChange).toBeCalled()
  })
})
