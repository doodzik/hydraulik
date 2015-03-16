require 'spec_helper'
require 'hydraulik/ast_structure'

describe Hydraulik::AST::Structure do
  it 'gets present crud operations' do
    ast = described_class.new %w(a b)
    expect(ast).to match(a: {}, b: {})
  end
end
