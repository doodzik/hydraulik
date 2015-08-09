jest.autoMockOff()

var Schema = require('../schema').default,
    Set    = require('../object-set')

describe('Object Set', function() {
  it('#read returns the set', function() {
    class User extends Schema {}
    var set = new Set(User)
    expect(set.set).toEqual({})
    set.set = { hi: 'ho' }
    expect(set.read()).toEqual({ hi: 'ho' })
  })

  it('#create returns the set', function() {
    class User extends Schema {}
    var set = new Set(User)
    set.create({name: 'hello'})
    expect(set.set).toEqual({name: 'hello'})
  })

  it('#update returns the set', function() {
    class User extends Schema {}
    var set = new Set(User)
    set.create({name: 'hello', post: 'hello'})
    set.update({}, {name: 'world'})
    expect(set.set).toEqual({name: 'world', post: 'hello'})
  })

  it('#destroy returns the set', function() {
    class User extends Schema {}
    var set = new Set(User)
    set.create({name: 'bye'})
    set.destroy()
    expect(set.set).toEqual({name: null})
  })
})
