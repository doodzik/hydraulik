require 'vote_init'

module Hydraulik
  module AST
    # Generates the Structure of the AST
    class Structure < Hash
      def init(operations)
        operations.map { |operation| self[operation.to_sym] = {} }
      end
    end
  end
end
