jest.dontMock('../str-error')
jest.dontMock('../str')
jest.dontMock('../../type')

describe('string', function() {
  var StrError
  StrError = require('../str-error')
  it('#validate return empty str', function() {
      expect(new StrError('').validate()).toEqual('')
  })

  it('#validate returns string string too long', function() {
    expect(new StrError('a').validate()).toEqual('Str is too long')
  })
})
