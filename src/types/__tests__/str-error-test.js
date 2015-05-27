jest.dontMock('../str-error')
jest.dontMock('../../type')

var StrError = require('../str-error')

describe('string', function() {
  it('#validate return no error', function() {
      expect(new StrError('').validate()).toEqual('')
  })

  it('#validate returns error', function() {
    expect(new StrError('a').validate()).toEqual('StrError: value should be of length 0')
  })
})
