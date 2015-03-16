require 'hydraulik_types'
require 'vote_init'

module Hydraulik
  class Component
    OPERATIONS = %w(list show create edit delete)

    OPERATIONS.each do |name|
      define_singleton_method name.to_sym do
        instance_variable = "@#{name}".to_sym
        value = instance_variable_get(instance_variable) || Elements.new
        instance_variable_set instance_variable, value
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
      fail ElementError unless value < Hydraulik::Type
      @name = value
    end
  end
end
