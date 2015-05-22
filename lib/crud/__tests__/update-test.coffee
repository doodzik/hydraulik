jest.dontMock '../update'

Update  = require('../update')

describe 'Update', ->
  it '#new generates actionType', ->
    update = new Update('Name')
    expect(update.actionType).toEqual 'Name_UPDATE'

  it '#matches actionType', ->
    update = new Update('Name')
    expect(update.matches('actionType')).toBeFalsy
    expect(update.matches(update.actionType)).toBeFalsy
