require 'hydraulik/dsl_component'
require 'vote_init'

module Hydraulik
  module AST
    # funnels all components in current namespace into an array
    class Funnel < Array
      def init
        concat! collect_components
      end

      def self.collect_components
        ObjectSpace.each_object(Class).select do |klass|
          klass < DSL::Component
        end
      end
    end
  end
end
