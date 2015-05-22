jest.dontMock '../str'

describe 'string', ->
  Str = require('../str')
  it '#validate dosnt throw nothing', ->
      str = 'hello'
      new Str(str).validate()

  it '#validate throws when string too long', ->
    str = new Array(130).join('a')
    expect ->
       new Str(str).validate()
    .toThrow('Str is too long')

  it '#validate is too short', ->
    str = ''
    expect ->
      new Str(str).validate()
    .toThrow('Str is too short')
