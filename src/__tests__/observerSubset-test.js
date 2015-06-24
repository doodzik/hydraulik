jest.dontMock('../observerSubset')

var ObserverSubset   = require('../observerSubset'),
    Set              = require('../set'),
    setEvents        = require('../setEvents'),
    assign           = require('object-assign'),
    React            = require('react/addons'),
    TestUtils        = React.addons.TestUtils

describe('ObserverSubset', function() {
  // #Component tests are in Component-test
  it('#create', function() {
    var dispatcher, observerSet, set
    dispatcher = {
      dispatch: jest.genMockFn(),
      register: jest.genMockFn()
    }
    set = new Set()
    set.actionTypeCreate = 'actionTypeCreate'
    observerSet = new ObserverSubset(set, dispatcher)
    observerSet.create('argObj')
    expect(observerSet.dispatcher.dispatch).toBeCalledWith({
      actionType: 'actionTypeCreate',
      argObj: 'argObj'
    })
  })

  it('#update', function() {
    var dispatcher, observerSet, set
    dispatcher = {
      dispatch: jest.genMockFn(),
      register: jest.genMockFn()
    }
    set = new Set()
    set.actionTypeUpdate = 'actionTypeUpdate'
    observerSet = new ObserverSubset(set, dispatcher)
    observerSet.update('query', 'argObj')
    expect(observerSet.dispatcher.dispatch).toBeCalledWith({
      actionType: 'actionTypeUpdate',
      query: 'query',
      argObj: 'argObj'
    })
  })

  it('#destroy', function() {
    var dispatcher, observerSet, set
    dispatcher = {
      dispatch: jest.genMockFn(),
      register: jest.genMockFn()
    }
    set = new Set()
    set.actionTypeDestroy = 'actionTypeDestroy'
    observerSet = new ObserverSubset(set, dispatcher)
    observerSet.destroy('query', 'argObj')
    expect(observerSet.dispatcher.dispatch).toBeCalledWith({
      actionType: 'actionTypeDestroy',
      query: 'query'
    })
  })

  describe('getStateObj', function() {
    var dispatcher = {
                        dispatch: jest.genMockFn(),
                        register: jest.genMockFn()
                      }
    var set = new Set()
    set.name = 'Name'
    set.error = { foo: 'bar' }
    set.read.mockReturnValue('value')
    it('#getStateObj', function() {
      var observerSet = new ObserverSubset(set, dispatcher)
      expect(observerSet.getStateObj()).toEqual({
        Name: 'value'
      })
    })

    it('#getStateObjError', function() {
      observerSet = new ObserverSubset(set, dispatcher)
      expect(observerSet.getStateObjError()).toEqual({
        Name_error: { foo: 'bar' }
      })
    })
  })
})
