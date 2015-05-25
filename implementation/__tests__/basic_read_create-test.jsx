jest.autoMockOff()

var React = require('react/addons')
var BasicReadCreate = require('../basic_read_create')
var TestUtils = React.addons.TestUtils;

describe('CheckboxWithLabel', function() {
  it('changes the text after click', function() {
    var basicReadCreate = TestUtils.renderIntoDocument(<BasicReadCreate />)

    var ul = TestUtils.findRenderedDOMComponentWithTag(basicReadCreate, 'ul')
    expect(ul.getDOMNode().textContent).toEqual('First')

    var input = TestUtils.findRenderedDOMComponentWithTag(basicReadCreate, 'button')
    TestUtils.Simulate.click(input)

    var ul = TestUtils.findRenderedDOMComponentWithTag(basicReadCreate, 'ul')
    expect(ul.getDOMNode().textContent).toEqual('FirstSecond')
  })
})
