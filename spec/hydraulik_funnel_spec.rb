require 'spec_helper'

describe Hydraulik::Funnel do
  it 'collects all components in namespace when initialized' do
    TestComponent  = Class.new(Hydraulik::Component)
    TestComponent1 = Class.new(Hydraulik::Component)
    expect(Hydraulik::Funnel.collect_components)
      .to contain_exactly(TestComponent1, TestComponent)
    Object.send(:remove_const, :TestComponent)
    Object.send(:remove_const, :TestComponent1)
  end
end

describe Hydraulik::Component::Expender do
  it 'gets present crud operations' do
    TestComponent  = Class.new(Hydraulik::Component)
    TestComponent.instance_variable_set :@show, ''
    TestComponent.instance_variable_set :@hi, ''
    TestComponent.instance_variable_set :@delete, ''
    expender = described_class.new(TestComponent)
    expect(expender.send(:operations)).to match_array(%w(show delete))
    Object.send(:remove_const, :TestComponent)
  end
end

describe Hydraulik::Component::Expender do
  it 'gets present crud operations' do
    TestComponent  = Class.new(Hydraulik::Component)
    TestComponent.instance_variable_set :@show, ''
    TestComponent.instance_variable_set :@hi, ''
    TestComponent.instance_variable_set :@delete, ''
    expender = described_class.new(TestComponent)
    expect(expender.send(:operations)).to match_array(%w(show delete))
    Object.send(:remove_const, :TestComponent)
  end
end

describe Hydraulik::Component::Expender::Ast do
  it 'gets present crud operations' do
    ast = described_class.new %w(a b)
    expect(ast).to match(a: {}, b: {})
  end
end
