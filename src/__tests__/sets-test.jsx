jest.dontMock('../schema')
jest.dontMock('../set')
jest.dontMock('../sets')

var Schema = require('../schema'),
    Set  = require('../set'),
    Sets = require('../sets')

describe('Sets', function() {
  it('#new sets the schema and init set', function() {
    var sets = new Sets('foo')
    expect(sets.set).toEqual('foo')
    expect(sets.sets).toEqual({})
  })

  it('#register', function() {
    var schema = new Schema('Name')
    var set  = new Set(schema)
    var sets = new Sets(Set)
    sets.register(schema)
    expect(sets.sets.Name).toEqual(set)
  })
})
