jest.dontMock('../schema')

var Schema = require('../schema').default,
    type   = require('../schema').type,
    skip   = require('../schema').skip,
    limit  = require('../schema').limit,
    Str    = require('hydraulik-types/lib/str').default


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
        preset: null,
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
        preset: null,
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
        preset: null,
        name: 'text'
      }, {
        type: Str,
        preset: null,
        name: 'str'
      }
    ])
  })

  it('@type same type is overwritten with new infos', function() {
    @type(Str, name = 'text')
    class Users extends Schema {}
    @type(Str, name = 'text', preset = 'hallo world')
    class Users2 extends Schema {}
    var schema = new Users2()
    expect(schema.types).toEqual([
      {
        type: Str,
        preset: 'hallo world',
        name: 'text'
      }
    ])
  })

  it('@limit', function() {
    class Users extends Schema {
      @limit(3)
      filter(val) {
        return true
      }
    }

    var users = new Users()
    expect(users.limit).toEqual(3)
    var schema = new Schema()
    expect(schema.limit).toEqual(0)
  })

  it('@skip', function() {
    class Users extends Schema {
      @skip(3)
      filter(val) {
        return true
      }
    }

    var users = new Users()
    expect(users.skip).toEqual(3)
    var schema = new Schema()
    expect(schema.skip).toEqual(0)
  })

  it('@skip with no args', function() {
    class Users extends Schema {
      @skip()
      filter(val) {
        return true
      }
    }

    var users = new Users()
    expect(users.skip).toEqual(true)
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
