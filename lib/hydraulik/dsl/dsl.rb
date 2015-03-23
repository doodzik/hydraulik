require 'hydraulik/dsl/component'
require 'vote_init'

module Hydraulik
  module DSL
    # funnels all components in current namespace into an array
    class DSL < Array
      def init
        concat DSL.collect_components
      end

      def self.collect_components
        ObjectSpace.each_object(Class).select do |klass|
          klass < Hydraulik::DSL::Component
        end
      end
    end
  end
end
