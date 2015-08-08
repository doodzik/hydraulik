jest.dontMock('../schema-decorator')

var type = require('../schema-decorator').type,
    skip   = require('../schema-decorator').skip,
    limit  = require('../schema-decorator').limit,
    Str    = require('hydraulik-types/lib/str').default

describe('schema decorators', function() {
  it('@type', function() {
    @type(Str)
    class Users {}
    expect(new Users().types).toEqual([
      {
        type: Str,
        preset: null,
        name: 'str'
      }
    ])
  })

  it('@type changes name of type', function() {
    @type(Str, name = 'text')
    class Users {}
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
    class Users {}
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
    class Users {}
    @type(Str, name = 'text', preset = 'hallo world')
    class Users2 extends Users {}
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
    class Users {
      @limit(3)
      filter(val) {
        return true
      }
    }

    var users = new Users()
    expect(users.limit).toEqual(3)
  })

  it('@skip', function() {
    class Users {
      @skip(3)
      filter(val) {
        return true
      }
    }

    var users = new Users()
    expect(users.skip).toEqual(3)
  })

  it('@skip with no args', function() {
    class Users {
      @skip()
      filter(val) {
        return true
      }
    }

    var users = new Users()
    expect(users.skip).toEqual(true)
  })

})

