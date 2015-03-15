require 'spec_helper'

describe Hydraulik::Component do
  it 'adds instance variable list if list is run' do
    expect(described_class.instance_variables).to_not include(:@list)
    described_class.list
    expect(described_class.instance_variables).to include(:@list)
  end

  it 'uses the same list object' do
    list1 = described_class.list
    list2 = described_class.list
    expect(list1.__id__).to eql(list2.__id__)
  end
end
