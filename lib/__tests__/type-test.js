jest.dontMock('../type')

describe('type', function() {
  var Type
  Type = require('../type')
  it('#validation return empty str', function() {
      expect(new Type('').validation()).toEqual('')
  })

  it('#validation', function() {
    var type = new Type('')
    expect(type.validate()).toEqual(type.validation())
  })

  it('#isValid', function() {
    var type = new Type('')
    expect(type.isValid()).toBeTruthy()
    type.validation = jest.genMockFn().mockReturnValue('a')
    expect(type.isValid()).toBeFalsy()
  })

  it('#getName', function() {
    var type = new Type('')
    expect(type.getName()).toEqual('Type')
  })

  it('#getName with custom name', function() {
    var type = new Type('', { name: 'CustomName'})
    expect(type.getName()).toEqual('CustomName')
  })
})
