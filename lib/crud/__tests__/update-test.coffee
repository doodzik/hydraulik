jest.dontMock '../update'
jest.dontMock '../../Schema'

Update  = require('../update')
Schema  = require('../../Schema')

describe 'Update', ->
  it '#new generates actionType', ->
    update = new Update(new Schema('Name'))
    expect(update.actionType).toEqual 'Name_UPDATE'

  it '#matches actionType', ->
    update = new Update(new Schema('Name'))
    expect(update.matches('actionType')).toBeFalsy
    expect(update.matches(update.actionType)).toBeFalsy
