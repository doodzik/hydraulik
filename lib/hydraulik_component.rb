require 'hydraulik_types'
require 'vote_init'

module Hydraulik
  class Component
    crud_operations = %w(list show create edit delete)

    crud_operations.each do |name|
      define_singleton_method name.to_sym do
        eval("@#{name} ||= Elements.new")
      end
    end
  end

  class Component::Elements
    attr_reader :elements

    def init
      @elements = []
    end

    def <<(value)
      value = Component::Element.new(value)
      @elements << value
    end
  end

  class Component::ElementError < StandardError
  end

  class Component::Element
    attr_reader :name

    def init(value)
      raise ElementError unless value < Hydraulik::Type
      @name = value.name
    end
  end
end

