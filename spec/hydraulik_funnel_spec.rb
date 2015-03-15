require 'spec_helper'

describe Hydraulik::Funnel do
  it 'collects all components in namespace when initialized' do
    TestClass  = Class.new(Hydraulik::Component)
    TestClass1 = Class.new(Hydraulik::Component)
    expect(Hydraulik::Funnel.collect_components).to contain_exactly(TestClass1, TestClass)
    Object.send(:remove_const, :TestClass)
    Object.send(:remove_const, :TestClass1)
  end
end
