require 'hydraulik/dsl_component'
require 'vote_init'

module Hydraulik
  module AST
    # funnels all components in current namespace into an array[TODO]
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
