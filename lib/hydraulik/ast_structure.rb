require 'vote_init'

module Hydraulik
  module AST
    # Generates the Structure of the AST
    class Structure < Hash
      def init(operations)
        operations.map do |operation|
          self[operation.to_sym] = AST::OperationStructure.new
        end
      end

      # def valid?
      #   has all fields assigned
      # end
    end

    # The structure for a operation
    class OperationStructure < Hash
      # def valid?
      #   has all fields assigned
      # end

      def route(route)
        self[:route] = route
        self
      end

      def field
        field = AST::FieldStructure.new
        (self[:fields] ||= []) << field
        field
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
