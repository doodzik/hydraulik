require 'vote_init'

module Hydraulik
  module Parser
    # Generates the Structure of the AST
    class Structure < Hash
      # TODO: mv init to parser
      def init(operations)
        operations.map do |operation|
          self[operation.to_sym] = Hydraulik::Parser::OperationStructure.new
        end
      end
    end

    # The structure for a operation
    class OperationStructure < Hash
      def route(route)
        self[:route] = route
        self
      end

      def field
        field = Hydraulik::Parser::FieldStructure.new
        yield field
        (self[:fields] ||= []) << field
      end
    end

    # the structore for its fields
    class FieldStructure < Hash
      def tag(name)
        self[:tag] = name
        self
      end
    end
  end
end
