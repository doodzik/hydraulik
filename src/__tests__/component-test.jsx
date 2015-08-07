jest.autoMockOff()

var React         = require('react/addons'),
    Str           = require('hydraulik-types/lib/str').default,
    min           = require('hydraulik-types/lib/str').min,
    h             = require('../hydraulik'),
    type          = require('../hydraulik').type,
    Klass         = require('../hydraulik').Klass,
    Schema        = require('../hydraulik').default,
    TestUtils     = React.addons.TestUtils

@min(1)
class CustomStr extends Str {}

@type(CustomStr, name = 'name')
class User extends Schema {
  filter(user) {
    return 'Second' == user.name || 'Third' == user.name
  }
}

@type(Str, name = 'name')
class User2 extends Schema {
  filter(user) {
    return 'Second' == user.name || 'Third' == user.name
  }
}

class User3 extends User2 {
  filter(user){
    return super.filter(user) && 'Third' == user.name
  }
}

var klass = new Klass()
    klass.push(User)
    klass.push(User3)
    klass.push(User2)

var users  = klass.sets.user,
    users2 = klass.sets.user2,
    users3 = klass.sets.user3

users.create({ name: 'First'})
users.create({ name: 'Second' })
users2.create({ name: 'Second' })

class Test {
  render(){
    return(<div></div>)
  }
}

describe('Component ObserverSet/Subset', function() {
  it('#Component', function() {
    var TestComp = users.Component(Test)
    var testComp = TestUtils.renderIntoDocument(<TestComp testProp="testValue"/>)

    expect(testComp.props).toEqual({testProp: 'testValue'})
    expect(testComp.state).toEqual({ user: [ { name: 'Second' } ] })

    users.create({ name: 'Third' })
    users.create({ name: 'Fourth' })

    expect(testComp.state).toEqual({ user: [ { name: 'Second' }, { name: 'Third' } ] })

    // TODO test if test component receives values
  })


  it('#ComponentError', function() {
    var TestComp = users.ComponentError(Test)
    var testComp = TestUtils.renderIntoDocument(<TestComp testProp="testValue"/>)

    expect(testComp.props).toEqual({testProp: 'testValue'})
    expect(testComp.state).toEqual({ user_error: { name: '' } })

    users.create({ name: '' })

    expect(testComp.state).toEqual({ user_error: { name: 'name is too short' } })

    // TODO test if test component receives values
  })

  it('#Component subsetOf', function() {
    var TestComp = users3.Component(Test)
    var testComp = TestUtils.renderIntoDocument(<TestComp testProp="testValue"/>)

    expect(testComp.props).toEqual({testProp: 'testValue'})
    expect(testComp.state).toEqual({ user3: [] })

    users2.create({ name: 'Third' })
    users2.create({ name: 'Fourth' })

    expect(testComp.state).toEqual({ user3: [{ name: 'Third' }] })

    // TODO test if test component receives values
  })
})
