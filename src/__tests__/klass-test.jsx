jest.autoMockOff()

var Schema = require('../schema'),
    Set    = require('../set'),
    Str    = require('hydraulik-types').Str,
    Klass  = require('../klass')

describe('Klass', function() {
  it('#new sets the schema and init set', function() {
    var sets = new Klass('foo')
    expect(sets.set).toEqual('foo')
    expect(sets.sets).toEqual({})
  })

  it('#register', function() {
    var schema = new Schema('Name')
    var sets   = new Klass(Set)
    sets.push(schema)
    expect(sets.sets.Name).toEqual(new Set(schema))
  })

  it('#buildSubsets subset and mainSet share the same set', function() {
    var schema  = new Schema('Name').type(Str)
    var schema2 = new Schema('Name2').subset(schema)
    var sets    = new Klass(Set)
    sets.push(schema)
    sets.push(schema2)
    sets.build()
    sets.sets.Name2.create('foo')
    sets.sets.Name.create('bar')
    sets.sets.Name.error['bar'] = 'baz'
    expect(sets.sets.Name2.set).toBe(sets.sets.Name.set)
    expect(sets.sets.Name2.error).toBe(sets.sets.Name.error)
  })

  it('#splitIntoBaseAndSubSets', function() {
    var schema  = new Schema('Name').type(Str)
    var schema2 = new Schema('Name2').subset(schema)
    var sets    = new Klass(Set)
    sets.push(schema)
    sets.push(schema2)
    sets.build()
    expect(sets.sets.Name2).toBe(sets.subSets.Name2)
    expect(sets.sets.Name).toBe(sets.baseSets.Name)
  })
})
