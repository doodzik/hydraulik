jest.dontMock('../schema')
jest.dontMock('../klass')
jest.dontMock('../set')

var Schema = require('../schema'),
    Set    = require('../set'),
    Klass  = require('../klass')

describe('Klass', function() {
  it('#push', function() {
    var schema = new Schema('Name')
    var sets   = new Klass()
    sets.push(schema)
    expect(sets._sets.name).toEqual(new Set(schema))
  })

  it('#sets getter', function() {

  })
})
