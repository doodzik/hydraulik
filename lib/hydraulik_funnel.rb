require 'hydraulik_component'
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

module Hydraulik
  class Component::Expender
    def init(component)
      @component  = component
      @operations = Ast.new(operations)
    end

    def operations
      @component.instance_variables
      .collect { |v| v.slice 1, 6 }
      .select  { |v| Component::Operations.include? v }
    end
  end

  class Component::Expender::Ast
    def init(operations)
      @structure = Hash[operations.map {|o| [o.to_sym, {}]}]
    end
  end
end
