jest.autoMockOff()

var Schema    = require('../schema').default,
    type      = require('../schema').type,
    Set       = require('../basic-set'),
    min       = require('hydraulik-types/lib/str').min,
    Str       = require('hydraulik-types/lib/str').default

describe('Basic Set', function() {
  it('#new sets the schema and init set', function() {
    class User extends Schema {}
    set    = new Set(User)
    expect(set.schema).toEqual(new User())
  })

  it('#new sets the name', function() {
    class User extends Schema {}
    set    = new Set(User)
    expect(set.name).toEqual('user')
  })

  describe("#validate", function() {
    @min(1)
    class CustomStr extends Str {}
    @type(CustomStr, name = 'str')
    class User extends Schema {}
    var set    = new Set(User)

    it('fullfills', function() {
      expect(set.validate({str: 'long enought'})).toEqual(false)
    })

   it('rejects', function() {
      expect(set.validate({str: ''})).toEqual(true)
    })
  })

  it("#preset sets missing keys", function() {
    @type(Str, name = 'str',  preset = 'bar')
    @type(Str, name = 'str2', preset = 'bar')
    class User extends Schema {}
    var set    = new Set(User)
    expect(set.preset({str: 'foo'})).toEqual({str: 'foo', str2: 'bar'})
  })
})

