jest.autoMockOff()

var Schema = require('../schema'),
    Set    = require('../set'),
    Str    = require('hydraulik-types').Str,
    Klass  = require('../klass')

describe('Klass', function() {
  it('#register', function() {
    var schema = new Schema('Name')
    var sets   = new Klass()
    sets.push(schema)
    expect(sets._sets.name).toEqual(new Set(schema))
  })

  it('#buildSubsets subset and BaseSet share the same set', function() {
    var schema  = new Schema('Name').type(Str)
    var schema2 = new Schema('Name2').subsetOf(schema)
    var sets    = new Klass()
    sets.push(schema)
    sets.push(schema2)
    sets.build()
    sets._sets.name2.create('foo')
    sets._sets.name.create('bar')
    sets._sets.name.error['bar'] = 'baz'
    expect(sets._sets.name2.set).toBe(sets._sets.name.set)
    expect(sets._sets.name2.error).toBe(sets._sets.name.error)
  })

  it('#splitIntoBaseAndSubSets', function() {
    var schema  = new Schema('Name').type(Str)
    var schema2 = new Schema('Name2').subsetOf(schema)
    var sets    = new Klass()
    sets.push(schema)
    sets.push(schema2)
    sets.build()
    expect(sets._sets.name2).toBe(sets.subSets.name2)
    expect(sets._sets.name).toBe(sets.baseSets.name)
  })
})
