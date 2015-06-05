jest.dontMock('../observerSubset')

var ObserverSubset   = require('../observerSubset'),
    Set        = require('../set'),
    setEvents  = require('../setEvents'),
    assign     = require('object-assign'),
    React      = require('react/addons'),
    TestUtils  = React.addons.TestUtils

describe('ObserverSubset', function() {
  // #Component tests are in Component-test
  it('#create', function() {
    var dispatcher, flux, set
    dispatcher = {
      dispatch: jest.genMockFn(),
      register: jest.genMockFn()
    }
    set = new Set()
    set.actionType = 'actionType'
    flux = new ObserverSubset(set, dispatcher)
    flux.create('argObj')
    expect(flux.dispatcher.dispatch).toBeCalledWith({
      actionType: 'actionType',
      argObj: 'argObj'
    })
  })

  describe('getStateObj', function() {
    var dispatcher, flux, set
    dispatcher = {
      dispatch: jest.genMockFn(),
      register: jest.genMockFn()
    }
    set = new Set()
    set.name = 'Name'
    set.error = { foo: 'bar' }
    set.read.mockReturnValue('value')
    it('#getStateObj', function() {
      flux = new ObserverSubset(set, dispatcher)
      expect(flux.getStateObj()).toEqual({
        Name: 'value'
      })
    })

    it('#getStateObjError', function() {
      flux = new ObserverSubset(set, dispatcher)
      expect(flux.getStateObjError()).toEqual({
        NameError: { foo: 'bar' }
      })
    })
  })
})
