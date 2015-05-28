jest.dontMock('../str')
jest.dontMock('../../type')

describe('string', function() {
  var Str
  Str = require('../str')
  it('#validate returns empty string', function() {
    var str = 'hello'
    expect(new Str(str).validate()).toEqual('')
  })

  it('#validate returns string string too long', function() {
    var str = new Array(130).join('a')
    expect(new Str(str).validate()).toEqual('Str is too long')
  })

  it('#validate returns string is too short', function() {
    var str = ''
    expect(new Str(str).validate()).toEqual('Str is too short')
  })
})
