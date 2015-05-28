jest.autoMockOff()

var React = require('react/addons')
var FilteredSet = require('../filtered_set')
var TestUtils = React.addons.TestUtils;

describe('FilteredSet', function() {
  it('changes the text after click', function() {
    var filteredSet = TestUtils.renderIntoDocument(<FilteredSet />)

    var ul = TestUtils.findRenderedDOMComponentWithTag(filteredSet, 'ul')
    expect(ul.getDOMNode().textContent).toEqual('Second')

    var input = TestUtils.findRenderedDOMComponentWithTag(filteredSet, 'button')
    TestUtils.Simulate.click(input)

    var ul = TestUtils.findRenderedDOMComponentWithTag(filteredSet, 'ul')
    expect(ul.getDOMNode().textContent).toEqual('SecondThird')
  })
})
