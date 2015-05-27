jest.autoMockOff()

var React = require('react/addons')
var BasicReadCreate = require('../basic_error_handling')
var TestUtils = React.addons.TestUtils;

describe('BasicReadCreate', function() {
  it('changes the text after click', function() {
    var basicReadCreate = TestUtils.renderIntoDocument(<BasicReadCreate />)

    var ul = TestUtils.findRenderedDOMComponentWithTag(basicReadCreate, 'span')
    expect(ul.getDOMNode().textContent).toEqual('')

    var input = TestUtils.findRenderedDOMComponentWithTag(basicReadCreate, 'button')
    TestUtils.Simulate.click(input)

    var ul = TestUtils.findRenderedDOMComponentWithTag(basicReadCreate, 'span')
    expect(ul.getDOMNode().textContent).toEqual('Str is too short')
  })
})
