require 'hydraulik/dsl_component'
require 'vote_init'

module Hydraulik
  module AST
    class Funnel
      def init
        @components = collect_components
      end

      def self.collect_components
        ObjectSpace.each_object(Class).select do |klass|
          klass < DSL::Component
        end
      end
    end
  end
end
