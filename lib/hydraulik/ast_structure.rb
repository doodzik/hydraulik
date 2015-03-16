require 'vote_init'

module Hydraulik
  module AST
    class Structure < Hash
      def init(operations)
        operations.map { |o| self[o.to_sym] = {} }
      end
    end
  end
end
