require 'hydraulik_component'
require 'vote_init'

module Hydraulik
  class Funnel
    def init
      @components = collect_components
    end

    def self.collect_components
      ObjectSpace.each_object(Class).select do |klass|
        klass < Hydraulik::Component
      end
    end
  end
end

module Hydraulik
  class Component::Expender
    def init(component)
      @component  = component
      @operations = Ast.new(operations)
    end

    def operations
      @component.instance_variables
        .collect { |v| v.slice 1, 6 }
        .select  { |v| Component::OPERATIONS.include? v }
    end
  end

  class Component::Expender::Ast < Hash
    def init(operations)
      operations.map { |o| self[o.to_sym] = {} }
    end
  end
end
