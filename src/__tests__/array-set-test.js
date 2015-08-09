jest.autoMockOff()

var Schema    = require('../schema').default,
    skip      = require('../schema').skip,
    limit     = require('../schema').limit,
    Set       = require('../array-set')

describe('Array Set', function() {
  describe('#read', function () {
    it('returns the set', function() {
      class User extends Schema {}
      var set = new Set(User)
      expect(set.read()).toEqual([])
      set.set = ['hello']
      expect(set.read()).toEqual(['hello'])
    })

    it('props is accessable through filterFn', function() {
      class User extends Schema {
        filter(user){
          return user.props == 'name'
        }
      }
      set        = new Set(User)
      set.set    = [{name: 'hello'}]
      expect(set.read('name')).toEqual([{name: 'hello'}])
    })
  })

  it('#read filters elements', function() {
    class User extends Schema {}
    User.prototype.filter   = jest.genMockFn()
                              .mockReturnValueOnce(false)
                              .mockReturnValueOnce(true)
                              .mockReturnValueOnce(false)
    var set                 = new Set(User)
    set.set                 = ['hello', 'huhuhu', 'beubte']
    expect(set.read()).toEqual(['huhuhu'])
  })

  it('#read filters elements and skips it', function() {
    class User extends Schema {
      @skip(2)
      filter(val) {
        return true
      }
    }
    var set                 = new Set(User)
    set.set                 = ['hello', 'huhuhu', 'beubte']
    expect(set.read()).toEqual(['beubte'])
  })

  it('#read filters elements and limits it', function() {
    class User extends Schema {
      @limit(2)
      filter(val) {
        return true
      }
    }
    var set                 = new Set(User)
    set.set                 = ['hello', 'huhuhu', 'beubte']
    expect(set.read()).toEqual(['hello', 'huhuhu'])
  })

  it('#read filters elements and limit with 1 returns it without the array', function() {
    class User extends Schema {
      @limit(1)
      filter(val) {
        return true
      }
    }
    var set                 = new Set(User)
    set.set                 = ['hello', 'huhuhu', 'beubte']
    expect(set.read()).toEqual('hello')
  })


  it('#read filters elements and skips it with skip prop', function() {
    class User extends Schema {
      @skip()
      filter(val) {
        return true
      }
    }
    var set                 = new Set(User)
    set.set                 = ['hello', 'huhuhu', 'beubte']
    expect(set.read({skip: 2})).toEqual(['beubte'])
  })

  it('#create returns the set', function() {
    class User extends Schema {}
    var set = new Set(User)
    expect(set.set).toEqual([])
    set.create({name: 'hello'})
    expect(set.set).toEqual([{name: 'hello'}])
  })

  it('#update returns the set', function() {
    class User extends Schema {}
    var set = new Set(User)
    set.create({name: 'hello'})
    set.create({name: 'bye'})
    set.update({name: 'bye'}, {name: 'world'})
    expect(set.set).toEqual([{name: 'hello'}, {name: 'world'}])
  })

  it('#destroy returns the set', function() {
    class User extends Schema {}
    var set = new Set(User)
    set.create({name: 'bye'})
    set.create({name: 'hello'})
    set.create({name: 'bye'})
    set.create({name: 'world'})
    set.create({name: 'bye'})
    set.destroy({name: 'bye'})
    expect(set.set).toEqual([{name: 'hello'}, {name: 'world'}])
  })
})
