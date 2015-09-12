jest.dontMock('../klassBuilder')

var klassBuilder = require('../klassBuilder')

describe('klassBuilder', function() {
  it('#isBaseSet', function() {
    var isIt = klassBuilder.isBaseSet({ set1: { baseSet: false },
                                        set2: { baseSet: 'true'}})
    expect(isIt('set1')).toBeTruthy()
    expect(isIt('set2')).toBeFalsy()
  })
})
