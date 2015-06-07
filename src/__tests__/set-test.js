jest.autoMockOff()

var Schema = require('../schema'),
    Set    = require('../set'),
    Str    = require('hydraulik-types').Str

describe('Set', function() {
  it('#new sets the schema and init set', function() {
    var schema = new Schema('Name'),
        set    = new Set(schema)
    expect(set.schema).toEqual(schema)
  })

  describe('#read', function () {
    it('returns the set', function() {
      var set = new Set(new Schema('Name'))
      expect(set.read()).toEqual([])
      set.set = ['hello']
      expect(set.read()).toEqual(['hello'])
    })

    it('props is accessable through filterFn', function() {
      var schema = new Schema('Name').filter(val => val.props == 'name'),
          set    = new Set(schema)
      set.set    = [{name: 'hello'}]
      expect(set.read('name')).toEqual([{name: 'hello'}])
    })
  })

  it('#read filters elements', function() {
    var schema      = new Schema('Name')
    schema.filterFn = jest.genMockFn()
                      .mockReturnValueOnce(false)
                      .mockReturnValueOnce(true)
                      .mockReturnValueOnce(false)
    var set         = new Set(schema)
    set.set         = ['hello', 'huhuhu', 'beubte']
    expect(set.read()).toEqual(['huhuhu'])
  })

  it('#create returns the set', function() {
    var set = new Set(new Schema('Name'))
    expect(set.set).toEqual([])
    set.create({name: 'hello'})
    expect(set.set).toEqual([{name: 'hello'}])
  })

  describe("#validate", function() {
    var schema = new Schema('Name').type(Str),
        set    = new Set(schema)
    it('fullfills', function() {
      expect(set.validate({str: 'long enought'})).toEqual(false)
    })

   it('rejects', function() {
      expect(set.validate({str: ''})).toEqual(true)
    })
  })
})
