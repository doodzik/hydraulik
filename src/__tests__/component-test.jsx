jest.autoMockOff()

var React         = require('react/addons'),
    Schema        = require('../schema'),
    Klass         = require('../klass'),
    Str           = require('hydraulik-types').Str,
    TestUtils     = React.addons.TestUtils

var Name  = new Schema('Name').type(Str).as('name')
                              .filter(val => 'Second' == val.name || 'Third' == val.name)

var klass = new Klass()
    klass.push(Name)

var Names          = klass.sets.name
// var observerSets   = new ObserverKlass(klass).sets
// var Names          = observerSets.name

Names.create({ name: 'First'})
Names.create({ name: 'Second' })

class Test {
  render(){
    return(<div></div>)
  }
}

describe('ObserverSubset', function() {
  it('#Component', function() {
    var TestComp = Names.Component(Test)
    var testComp = TestUtils.renderIntoDocument(<TestComp testProp="testValue"/>)

    expect(testComp.props).toEqual({testProp: 'testValue'})
    expect(testComp.state).toEqual({ name: [ { name: 'Second' } ] })

    Names.create({ name: 'Third' })
    Names.create({ name: 'Fourth' })

    expect(testComp.state).toEqual({ name: [ { name: 'Second' }, { name: 'Third' } ] })

    // TODO test if test component receives values
  })


  it('#ComponentError', function() {
    var TestComp = Names.ComponentError(Test)
    var testComp = TestUtils.renderIntoDocument(<TestComp testProp="testValue"/>)

    expect(testComp.props).toEqual({testProp: 'testValue'})
    expect(testComp.state).toEqual({ nameError: { name: '' } })

    Names.create({ name: '' })

    expect(testComp.state).toEqual({ nameError: { name: 'Str is too short' } })

    // TODO test if test component receives values
  })
})
