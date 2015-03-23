require 'hydraulik/dsl/component'
require 'hydraulik/parser/structure'
require 'vote_init'

module Hydraulik
  module Parser
    # Takes a DSL::Component and expands its informations
    # TODO: rename Component
    # TODO: The ties of this class to other are weired
    #       clean it up -> Restructure
    class ComponentExpender
      def init(component)
        @component  = component
        @operations = Hydraulik::Parser::Structure.new(operations)
      end

      def operations
        @component.instance_variables
          .collect { |comp| comp.slice 1, 6 }
          .select  { |comp| DSL::Component::OPERATIONS.include? comp }
      end
    end
  end
end
