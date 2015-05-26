jest.dontMock('../str-error')
jest.dontMock('../str')

describe('string', function() {
  var StrError
  StrError = require('../str-error')
  it('#validate dosnt throw nothing', function() {
    new StrError('').validate()
  })

  it('#validate throws when string too long', function() {
    expect(function() {
      new StrError('a').validate()
    }).toThrow('Str is too long')
  })
})
