require 'spec_helper'
require 'hydraulik/ast_funnel'

describe Hydraulik::AST::Funnel do
  it 'collects all components in namespace when initialized' do
    # Trigger GC because a anonymous DSL::Component Class child
    # is added to the ObjectSpace in the it block
    GC.start
    TestComponent  = Class.new(Hydraulik::DSL::Component)
    TestComponent1 = Class.new(Hydraulik::DSL::Component)
    expect(described_class.collect_components)
      .to contain_exactly(TestComponent1, TestComponent)
    expect(described_class.new)
      .to contain_exactly(TestComponent1, TestComponent)
    Object.send(:remove_const, :TestComponent)
    Object.send(:remove_const, :TestComponent1)
  end
end
