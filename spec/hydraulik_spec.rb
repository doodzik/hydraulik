require 'spec_helper'

describe Hydraulik do
  it 'has a version number' do
    expect(Hydraulik::VERSION).not_to be nil
  end

  describe Hydraulik::Component::Elements do
    it 'pushes element onto elements' do
      list = described_class.new
      allow(Hydraulik::Component::Element).to receive(:new).with(1).and_return 1
      allow(Hydraulik::Component::Element).to receive(:new).with(2).and_return 2
      list << 1
      list << 2
      expect(list.elements).to match_array([1, 2])
    end

    it 'before pushing onto elements runs value through List Element' do
      list = described_class.new
      expect(Hydraulik::Component::Element)
        .to receive(:new).with(1).and_return 2
      list << 1
      expect(list.elements).to eql([2])
    end
  end

  describe Hydraulik::Component::Element do
    it 'returns class name when of Hydraulik::Type' do
      TestClass = Class.new(Hydraulik::Type)
      expect(described_class.new(TestClass).name).to eq(TestClass)
      Object.send(:remove_const, :TestClass)
    end

    it 'raises class name when not of Hydraulik::Type' do
      TestClass = Class.new(Object)
      expect { described_class.new(TestClass) }.to raise_error(StandardError)
      Object.send(:remove_const, :TestClass)
    end
  end
end
