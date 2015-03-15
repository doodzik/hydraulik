require 'vote_init'

module Hydraulik
  class Funnel
    def init
      @components = self.collect_components
    end

    def self.collect_components
      ObjectSpace.each_object(Class).select do |klass|
        klass < Hydraulik::Component
      end
    end
  end
end
