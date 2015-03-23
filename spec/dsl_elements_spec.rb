require 'spec_helper'
require 'hydraulik/dsl/elements'

describe Hydraulik::DSL::Elements do
  it 'pushes element onto elements' do
    list = described_class.new
    element = double 'element'
    allow(Hydraulik::DSL::Element).to receive(:new) { element }
    expect(element).to receive(:validate).twice
    list << 1
    list << 2
    expect(list).to match_array([1, 2])
  end
end

describe Hydraulik::DSL::Element do
  it '#valid? fails if not a DSL::Type Class' do
    expect(described_class.new(Class.new(Object)).valid?).to be false
  end

  it '#valid? succeeds if DSL::Type Class' do
    expect(described_class.new(Class.new(Hydraulik::DSL::Type)).valid?)
      .to be true
  end

  it '#validate succeeds returns nil' do
    element = described_class.new('')
    allow(element).to receive(:valid?).and_return true
    expect(element.validate).to be nil
  end

  it '#validate fails raises error' do
    element = described_class.new('')
    allow(element).to receive(:valid?).and_return false
    expect { element.validate }.to raise_error(StandardError)
  end
end
