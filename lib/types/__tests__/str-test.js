jest.dontMock('../str')
jest.dontMock('../../type')

describe('string', function() {
  var Str
  Str = require('../str')
  it('#validate returns empty string', function() {
    var str
    str = 'hello'
    expect(new Str(str).validate()).toEqual('')
  })

  it('#validate returns string string too long', function() {
    var str
    str = new Array(130).join('a')
    expect(new Str(str).validate()).toEqual('Str is too long')
  })

  return it('#validate returns string is too short', function() {
    var str
    str = ''
    expect(new Str(str).validate()).toEqual('Str is too short')
  })
})
