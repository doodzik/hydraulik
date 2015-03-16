require 'hydraulik/dsl_component'
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
          .collect { |v| v.slice 1, 6 }
          .select  { |v| DSL::Component::OPERATIONS.include? v }
      end
    end
  end
end
