jest.autoMockOff()

var Schema      = require('../schema'),
    Set       = require('../set'),
    Sets      = require('../sets'),
    Str         = require('hydraulik-types').Str,
    SetsBuild = require('../sets-build')

describe('SetsBuild', function() {
  it('#buildSubsets subset and mainSet share the same set', function() {
    var schema  = new Schema('Name').type(Str)
    var schema2 = new Schema('Name2').subset(schema)
    var sets  = new Sets(Set)
    sets.register(schema)
    sets.register(schema2)
    var setsBuild  = new SetsBuild(sets)
    setsBuild.sets.Name2.create('foo')
    setsBuild.sets.Name.create('bar')
    setsBuild.sets.Name.error['bar'] = 'baz'
    expect(sets.sets.Name2.set).toEqual(sets.sets.Name.set)
    expect(sets.sets.Name2.error).toEqual(sets.sets.Name.error)
  })

  it('#splitIntoBaseAndSubSets', function() {
    var schema  = new Schema('Name').type(Str)
    var schema2 = new Schema('Name2').subset(schema)
    var sets  = new Sets(Set)
    sets.register(schema)
    sets.register(schema2)
    var setsBuild  = new SetsBuild(sets)
    expect(sets.sets.Name2).toEqual(setsBuild.subSets.Name2)
    expect(sets.sets.Name).toEqual(setsBuild.baseSets.Name)
  })
})
