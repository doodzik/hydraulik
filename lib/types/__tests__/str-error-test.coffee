jest.dontMock '../str-error'
jest.dontMock '../str'

describe 'string', ->
  StrError = require('../str-error')
  it '#validate dosnt throw nothing', ->
    new StrError('').validate()

  it '#validate throws when string too long', ->
    expect ->
       new StrError('a').validate()
    .toThrow('Str is too long')
