jest.dontMock '../destroy'
jest.dontMock '../../Schema'

Schema  = require('../../Schema')
Destroy  = require('../destroy')

describe 'Destroy', ->
  it '#new generates actionType', ->
    destroy = new Destroy(new Schema('Name'))
    expect(destroy.actionType).toEqual 'Name_DESTROY'

  it '#matches actionType', ->
    destroy = new Destroy(new Schema('Name'))
    expect(destroy.matches('actionType')).toBeFalsy
    expect(destroy.matches(destroy.actionType)).toBeFalsy
