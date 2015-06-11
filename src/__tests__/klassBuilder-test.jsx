jest.dontMock('../klassBuilder')

var klassBuilder = require('../klassBuilder')

describe('klassBuilder', function() {
  it('#filterSplit', function() {
    var filtered = klassBuilder.filterSplit([true, false], val => val)
    expect(filtered[0]).toEqual([true])
    expect(filtered[1]).toEqual([false])
  })

  it('#isBaseSet', function() {
    var isIt = klassBuilder.isBaseSet({ set1: { schema: { baseSet: false }}, 
                                        set2: { schema: { baseSet: {}}}})
    expect(isIt('set1')).toBeTruthy()
    expect(isIt('set2')).toBeFalsy()
  })
})
