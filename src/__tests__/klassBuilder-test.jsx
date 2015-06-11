jest.dontMock('../klassBuilder')

var klassBuilder = require('../klassBuilder')

describe('klassBuilder', function() {
  it('#sortedKeys', function() {
    sets = { set1: { schema: { baseSet: true } }, set2: { schema: { baseSet: false } } }
    expect(klassBuilder.sortedKeys(sets)).toEqual(['set2', 'set1'])
  })
})
