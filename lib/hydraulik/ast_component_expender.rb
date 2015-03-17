require 'hydraulik/dsl_component'
require 'hydraulik/ast_structure'
require 'vote_init'

module Hydraulik
  module AST
    # Takes a DSL::Component and expands its informations
    class ComponentExpender
      def init(component)
        @component  = component
        @operations = AST::Structure.new(operations)
      end

      def operations
        @component.instance_variables
          .collect { |comp| comp.slice 1, 6 }
          .select  { |comp| DSL::Component::OPERATIONS.include? comp }
      end
    end
  end
end
