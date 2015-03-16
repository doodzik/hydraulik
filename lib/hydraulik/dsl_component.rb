module Hydraulik
  module DSL
    # Implements the Component DSL implementation
    class Component
      OPERATIONS = %w(list show create edit delete)

      OPERATIONS.each do |name|
        define_singleton_method name.to_sym do
          instance_variable = "@#{name}".to_sym
          value = instance_variable_get(instance_variable) || Elements.new
          instance_variable_set instance_variable, value
        end
      end
    end
  end
end
