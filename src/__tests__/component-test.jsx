jest.autoMockOff()

var React         = require('react/addons'),
    Schema        = require('../schema'),
    Klass         = require('../klass'),
    Str           = require('hydraulik-types').Str,
    TestUtils     = React.addons.TestUtils

var User  = new Schema('Users').type(Str).as('name')
                              .filter(user => 'Second' == user.name || 'Third' == user.name)

var User2 = new Schema('Users2').type(Str).as('name')
                              .filter(user => 'Second' == user.name || 'Third' == user.name)

var User3 = new Schema('Users3').subsetOf(User2).filter(user => 'Third' == user.name)


var klass = new Klass()
    klass.push(User)
    klass.push(User3)
    klass.push(User2)

var Users  = klass.sets.users,
    Users3 = klass.sets.users3,
    Users2 = klass.sets.users2

Users.create({ name: 'First'})
Users.create({ name: 'Second' })
Users2.create({ name: 'Second' })

class Test {
  render(){
    return(<div></div>)
  }
}

describe('Component ObserverSet/Subset', function() {
  it('#Component', function() {
    var TestComp = Users.Component(Test)
    var testComp = TestUtils.renderIntoDocument(<TestComp testProp="testValue"/>)

    expect(testComp.props).toEqual({testProp: 'testValue'})
    expect(testComp.state).toEqual({ users: [ { name: 'Second' } ] })

    Users.create({ name: 'Third' })
    Users.create({ name: 'Fourth' })

    expect(testComp.state).toEqual({ users: [ { name: 'Second' }, { name: 'Third' } ] })

    // TODO test if test component receives values
  })


  it('#ComponentError', function() {
    var TestComp = Users.ComponentError(Test)
    var testComp = TestUtils.renderIntoDocument(<TestComp testProp="testValue"/>)

    expect(testComp.props).toEqual({testProp: 'testValue'})
    expect(testComp.state).toEqual({ users_error: { name: '' } })

    Users.create({ name: '' })

    expect(testComp.state).toEqual({ users_error: { name: 'Str is too short' } })

    // TODO test if test component receives values
  })

  it('#Component subsetOf', function() {
    var TestComp = Users3.Component(Test)
    var testComp = TestUtils.renderIntoDocument(<TestComp testProp="testValue"/>)

    expect(testComp.props).toEqual({testProp: 'testValue'})
    expect(testComp.state).toEqual({ users3: [] })

    Users2.create({ name: 'Third' })
    Users2.create({ name: 'Fourth' })

    expect(testComp.state).toEqual({ users3: [{ name: 'Third' }] })

    // TODO test if test component receives values
  })
})
