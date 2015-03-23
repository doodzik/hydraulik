require 'spec_helper'
require 'hydraulik/parser/structure'

describe Hydraulik::Parser::Structure do
  it 'gets present crud operations' do
    ast = described_class.new %w(a b)
    expect(ast).to match(a: {}, b: {})
    expect(ast[:a])
      .to be_an_instance_of Hydraulik::Parser::OperationStructure
  end
end

describe Hydraulik::Parser::OperationStructure do
  it '#route sets route' do
    ast = described_class.new
    ast.route('route')
    expect(ast).to match(route: 'route')
  end

  it '#field returns a field object' do
    ast = described_class.new
    expect { |b| ast.field(&b) }
      .to yield_with_args(Hydraulik::Parser::FieldStructure)
    expect(ast).to match(fields: [{}])
    expect(ast[:fields][0])
      .to be_an_instance_of Hydraulik::Parser::FieldStructure
  end
end
