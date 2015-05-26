jest.dontMock('../str')

describe('string', function() {
  var Str
  Str = require('../str')
  it('#validate dosnt throw nothing', function() {
    var str
    str = 'hello'
    new Str(str).validate()
  })

  it('#validate throws when string too long', function() {
    var str
    str = new Array(130).join('a')
    expect(function() {
      new Str(str).validate()
    }).toThrow('Str is too long')
  })

  return it('#validate is too short', function() {
    var str
    str = ''
    expect(function() {
      new Str(str).validate()
    }).toThrow('Str is too short')
  })
})
