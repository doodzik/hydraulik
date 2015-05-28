jest.dontMock('../schema')

var Schema = require('../schema'),
    Str = require('hydraulik-types').Str

describe('Schema', function() {
  it('#new sets the name', function() {
    var schema
    schema = new Schema('Name')
    expect(schema.name).toEqual('Name')
  })

  it('#type adds new type', function() {
    var schema
    schema = new Schema('')
    expect(schema.types).toEqual([])
    schema.type(Str)
    expect(schema.types).toEqual([
      {
        type: Str,
        name: 'Str'
      }
    ])
  })

  it('#as changes name of last added type', function() {
    var schema
    schema = new Schema('')
    schema.type(Str).type(Str).as('text')
    expect(schema.types).toEqual([
      {
        type: Str,
        name: 'Str'
      }, {
        type: Str,
        name: 'text'
      }
    ])
  })
})
