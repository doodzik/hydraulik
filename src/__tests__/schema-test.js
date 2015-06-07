jest.dontMock('../schema')

var Schema = require('../schema'),
    Str = require('hydraulik-types').Str

describe('Schema', function() {
  it('#new sets the name', function() {
    var schema = new Schema('Name')
    expect(schema.name).toEqual('name')
  })

  it('#type adds new type', function() {
    var schema = new Schema('')
    expect(schema.types).toEqual([])
    schema.type(Str)
    expect(schema.types).toEqual([
      {
        type: Str,
        name: 'str'
      }
    ])
  })

  it('#as changes name of last added type', function() {
    var schema = new Schema('').type(Str).type(Str).as('text')
    expect(schema.types).toEqual([
      {
        type: Str,
        name: 'str'
      }, {
        type: Str,
        name: 'text'
      }
    ])
  })

  it("#filter sets filter and returns this", function() {
    var schema = new Schema('Name')
    expect(schema.filter('hello')).toEqual(schema)
    expect(schema.filterFn).toEqual('hello')
    expect(schema.filterOriginal).toEqual('hello')
  })

  it("#filterFn if filter isn't called than function that returns true", function() {
    var schema = new Schema('Name')
    expect(schema.filterFn()).toEqual(true)
    expect(schema.filterOriginal()).toEqual(true)
  })

  it("#subset sets subsetOf with return value of _getBaseSet and sets filterFn with _getFilterComposition", function() {
    var schema = new Schema('Name')
    expect(schema.subsetOf).toEqual(false)
    schema._getBaseSet           = jest.genMockFn().mockReturnValue('hello')
    schema._getFilterComposition = jest.genMockFn().mockReturnValue('huhu')
    expect(schema.subset('')).toEqual(schema)
    expect(schema.subsetOf).toEqual('hello')
    expect(schema.filterFn).toEqual('huhu')
  })

  it("#_getFilterComposition composese parent with child filters", function() {
    var schema  = new Schema('Name'),
        schema2 = new Schema('Name2')
    schema.filterFn        = jest.genMockFn().mockReturnValue(true)
    schema2.filterOriginal = jest.genMockFn().mockReturnValue(true)
    filter = schema2._getFilterComposition(schema)
    expect(filter({})).toBeTruthy()
    expect(schema.filterFn).toBeCalled()
    expect(schema2.filterOriginal).toBeCalled()
  })

  it("#_getFilterComposition returns false when one fails", function() {
    var schema  = new Schema('Name'),
        schema2 = new Schema('Name2')
    schema.filterFn        = jest.genMockFn().mockReturnValue(false)
    schema2.filterOriginal = jest.genMockFn().mockReturnValue(true)
    filter = schema2._getFilterComposition(schema)
    expect(filter({})).toBeFalsy()
    expect(schema.filterFn).toBeCalled()
    expect(schema2.filterOriginal).not.toBeCalled()
  })

  it("#_getBaseSet returns base set", function() {
    var schema  = new Schema('Name'),
        schema2 = new Schema('Name2').subset(schema),
        schema3 = new Schema('Name3').subset(schema2),
        schema4 = new Schema('Name3').subset(schema3)
    expect(schema4._getBaseSet(schema3)).toEqual(schema)
  })
})
