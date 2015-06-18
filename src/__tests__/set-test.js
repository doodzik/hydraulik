jest.autoMockOff()

var Schema = require('../schema').default,
    type   = require('../schema').type,
    Set    = require('../set'),
    Str    = require('hydraulik-types').Str

describe('Set', function() {
  it('#new sets the schema and init set', function() {
    class User extends Schema {}
    set    = new Set(User)
    expect(set.schema).toEqual(new User())
  })

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
      set    = new Set(User)
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

  it('#create returns the set', function() {
    class User extends Schema {}
    var set = new Set(User)
    expect(set.set).toEqual([])
    set.create({name: 'hello'})
    expect(set.set).toEqual([{name: 'hello'}])
  })

  describe("#validate", function() {
    @type(Str)
    class User extends Schema {}
    var set    = new Set(User)
    it('fullfills', function() {
      expect(set.validate({str: 'long enought'})).toEqual(false)
    })

   it('rejects', function() {
      expect(set.validate({str: ''})).toEqual(true)
    })
  })
})
