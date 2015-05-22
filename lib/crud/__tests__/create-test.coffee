jest.dontMock '../create'

Create  = require('../create')

describe 'Create', ->
  it '#new generates actionType', ->
    create = new Create('Name')
    expect(create.actionType).toEqual 'Name_CREATE'

  it '#matches actionType', ->
    create = new Create('Name')
    expect(create.matches('actionType')).toBeFalsy
    expect(create.matches(create.actionType)).toBeFalsy
