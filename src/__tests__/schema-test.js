jest.dontMock('../schema')

var Schema = require('../schema').default,
    type   = require('../schema').type,
    skip   = require('../schema').skip,
    Str    = require('hydraulik-types').Str


describe('Schema', function() {
  it('#new sets the name', function() {
    class Users extends Schema {}
    var schema = new Users()
    expect(schema.name).toEqual('users')
  })

  it('@type', function() {
    @type(Str)
    class Users extends Schema {}
    var schema = new Users()
    expect(schema.types).toEqual([
      {
        type: Str,
        name: 'str'
      }
    ])
  })

  it('@type changes name of type', function() {
    @type(Str, name = 'text')
    class Users extends Schema {}
    var schema = new Users()
    expect(schema.types).toEqual([
      {
        type: Str,
        name: 'text'
      }
    ])
  })

  it('@type is chainable', function() {
    @type(Str)
    @type(Str, name = 'text')
    class Users extends Schema {}
    var schema = new Users()
    expect(schema.types).toEqual([
      {
        type: Str,
        name: 'text'
      }, {
        type: Str,
        name: 'str'
      }
    ])
  })

  it('@type', function() {
    class Users extends Schema {
      @skip(3)
      filter(val) {
        return true
      }
    }

    var users = new Users()
    expect(users.skip).toEqual(3)
    var schema = new Schema()
    expect(schema.skip).toEqual(false)
  })

  it("#filter if filter isn't called than function that returns true", function() {
    var schema = new Schema()
    expect(schema.filter()).toEqual(true)
  })

  it("subsetOf", function() {
    class Users  extends Schema {}
    class Admins extends Users {}
    var users  = new Users(),
        admins = new Admins()
    expect(users.baseSet).toEqual(false)
    expect(admins.baseSet).toEqual('users')
  })
})
