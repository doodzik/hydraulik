jest.dontMock('../array')

var klassBuilder = require('../array')

describe('klassBuilder', function() {
  it('#split', function() {
    var filtered = klassBuilder.split([true, false], val => val)
    expect(filtered[0]).toEqual([true])
    expect(filtered[1]).toEqual([false])
  })
})
