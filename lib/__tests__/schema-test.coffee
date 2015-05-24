jest.dontMock '../schema'

Schema  = require('../schema')
Create  = require('../crud/create')
Read    = require('../crud/read')
Update  = require('../crud/update')
Destroy = require('../crud/destroy')
Str     = require('../types/str')

describe 'Schema', ->
  it '#new sets the name', ->
    schema = new Schema('Name')
    expect(schema.name).toEqual('Name')

  it '#type adds new type', ->
    schema = new Schema('')
    expect(schema.types).toEqual []
    schema.type Str
    expect(schema.types).toEqual [
    	type: Str
    	name: 'Str'
    ]

  it '#as changes name of last added type', ->
    schema = new Schema('')
    schema.type(Str).type(Str).as 'text'
    expect(schema.types).toEqual [
      { type: Str, name: 'Str' }
      { type: Str, name: 'text' }
    ]

  [Create, Read, Update, Destroy].map (ActionClass) ->
    Name = ActionClass.name
    name = ActionClass.name.toLowerCase()
    # it "##{name} sets a new #{Name} instance", ->
    #   schema = new Schema('')
    #   expect(schema[Name]).toBeFalsy()
    #   schema[name]()
    #   expect(schema[Name]).toEqual(new ActionClass())

    it "##{name} takes a callback with its instance", ->
      action = jest.genMockFunction()
      schema = new Schema('')[name](action)
      expect(action).toBeCalledWith(schema[Name])
