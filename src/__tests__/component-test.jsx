jest.autoMockOff()

var React = require('react/addons')
var Schema = require('../schema')
var Sets = require('../sets')
var Set = require('../set')
var SetsBuild = require('../sets-build')
var ClassObserver = require('../classObserver')
var Str = require('hydraulik-types').Str

var TestUtils  = React.addons.TestUtils

var Name = new Schema('Name').type(Str).as('name')
                             .filter(val => 'Second' == val.name || 'Third' == val.name)

var sets = new Sets(Set)
    sets.register(Name)

var setsBuild      = new SetsBuild(sets)
var classObserver  = new ClassObserver(setsBuild).sets
var Names          = classObserver.Name

Names.create({ name: 'First'})
Names.create({ name: 'Second' })

class Test {
  render(){
    return(<div></div>)
  }
}

describe('FluxBase', function() {
  it('#Component', function() {
    var TestComp = Names.Component(Test)
    var testComp = TestUtils.renderIntoDocument(<TestComp testProp="testValue"/>)

    expect(testComp.props).toEqual({testProp: 'testValue'})
    expect(testComp.state).toEqual({ Name: [ { name: 'Second' } ] })

    Names.create({ name: 'Third' })
    Names.create({ name: 'Fourth' })

    expect(testComp.state).toEqual({ Name: [ { name: 'Second' }, { name: 'Third' } ] })

    // TODO test if test component receives values
  })


  it('#ComponentError', function() {
    var TestComp = Names.ComponentError(Test)
    var testComp = TestUtils.renderIntoDocument(<TestComp testProp="testValue"/>)

    expect(testComp.props).toEqual({testProp: 'testValue'})
    expect(testComp.state).toEqual({ NameError: { name: '' } })

    Names.create({ name: '' })

    expect(testComp.state).toEqual({ NameError: { name: 'Str is too short' } })

    // TODO test if test component receives values
  })
})
