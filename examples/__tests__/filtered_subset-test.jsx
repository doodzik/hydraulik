jest.autoMockOff()

var React = require('react/addons')
var FilteredSet = require('../filtered_subset')
var TestUtils = React.addons.TestUtils;

describe('FilteredSubset', function() {
  it('changes the text after click', function() {
    var filteredSubset = TestUtils.renderIntoDocument(<FilteredSubset />)

    var ul = TestUtils.findRenderedDOMComponentWithTag(filteredSubset, 'ul')
    expect(ul.getDOMNode().textContent).toEqual('Second')

    var input = TestUtils.findRenderedDOMComponentWithTag(filteredSubset, 'button')
    TestUtils.Simulate.click(input)

    var ul = TestUtils.findRenderedDOMComponentWithTag(filteredSubset, 'ul')
    expect(ul.getDOMNode().textContent).toEqual('SecondThird')
  })
})
