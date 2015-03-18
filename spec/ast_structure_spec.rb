require 'spec_helper'
require 'hydraulik/ast_structure'

describe Hydraulik::AST::Structure do
  it 'gets present crud operations' do
    ast = described_class.new %w(a b)
    expect(ast).to match(a: {}, b: {})
    expect(ast[:a])
      .to be_an_instance_of Hydraulik::AST::OperationStructure
  end
end

describe Hydraulik::AST::OperationStructure do
  it '#route sets route' do
    ast = described_class.new
    ast.route('route')
    expect(ast).to match(route: 'route')
  end

  it '#field returns a field object' do
    ast = described_class.new
    expect(ast.field)
      .to be_an_instance_of Hydraulik::AST::FieldStructure
    expect(ast).to match(fields: [{}])
  end
end
