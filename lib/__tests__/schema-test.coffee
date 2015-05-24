jest.dontMock '../schema'

Schema  = require('../schema')
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
