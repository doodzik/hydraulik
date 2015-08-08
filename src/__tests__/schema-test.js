jest.dontMock('../schema')

var Schema = require('../schema').default

describe('Schema', function() {
  it('#new sets defaults', function() {
    class Users extends Schema {}
    var schema = new Users()
    expect(schema.name).toEqual('users')
    expect(schema.limit).toEqual(0)
    expect(schema.skip).toEqual(0)
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
