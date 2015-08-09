jest.dontMock('../schema')
jest.dontMock('../klass')
jest.dontMock('../array-set')

var Schema = require('../schema').default,
    Set    = require('../array-set'),
    Klass  = require('../klass')

describe('Klass', function() {
  it('#push', function() {
    class User extends Schema {}
    var sets   = new Klass()
    sets.push(User)
    expect(sets._sets.user).toEqual(new Set(User))
  })

  it('#sets getter', function() {

  })
})
