require 'spec_helper'
require 'hydraulik/ast_component_expender'

describe Hydraulik::AST::ComponentExpender do
  it 'gets present crud operations' do
    TestComponent  = Class.new(Hydraulik::DSL::Component)
    TestComponent.instance_variable_set :@show, ''
    TestComponent.instance_variable_set :@hi, ''
    TestComponent.instance_variable_set :@delete, ''
    expender = described_class.new(TestComponent)
    expect(expender.send(:operations)).to match_array(%w(show delete))
    Object.send(:remove_const, :TestComponent)
  end
end
