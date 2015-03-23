require 'hydraulik/dsl/types'
require 'vote_init'

module Hydraulik
  module DSL
    # holds elements for each operation
    class Elements < Array
      def <<(element)
        Element.new(element).validate
        super
      end
    end

    # Validates an element of the class Elements
    class Element
      # not init because rubocop wines
      def initialize(value)
        @element = value
      end

      def validate
        fail DSL::ElementError unless valid?
      end

      def valid?
        # the false added at the end because
        # element < Hydraulik::DSL::Type returns nil if false
        @element.class == Class && @element < Hydraulik::DSL::Type || false
      end
    end

    # error for when const isnt of DSL::Type
    class ElementError < StandardError
    end
  end
end
