jest.dontMock('../flux-base')

var FluxBase   = require('../flux-base'),
    Store      = require('../store'),
    EventStore = require('../EventStore'),
    assign     = require('object-assign'),
    React      = require('react/addons'),
    TestUtils  = React.addons.TestUtils

describe('FluxBase', function() {
  // #Component tests are in Component-test
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
})
