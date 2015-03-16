require 'hydraulik/dsl_types'
require 'vote_init'

module Hydraulik
  module DSL
    class Elements
      attr_reader :elements

      def init
        @elements = []
      end

      def <<(value)
        value = DSL::Element.new(value)
        @elements << value
      end
    end

    class ElementError < StandardError
    end

    class Element
      attr_reader :name

      def init(value)
        fail DSL::ElementError unless value < Hydraulik::DSL::Type
        @name = value
      end
    end
  end
end
