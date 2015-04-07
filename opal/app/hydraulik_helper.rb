# require 'active_support/inflector'
# TODO split to HInput and HOutput
#      mv symbols to types
class HHelper
  def self.route(id = '')
    path = name.split(/(?=[A-Z])/)
    path = path.map { |p| p.downcase }
    case path.last
    when 'list' then
      path.delete_at(-1)
      path[0] = "#{path[0]}s"
    when 'show' then
      path.delete_at(-1)
      path << ((id.empty?) ? ':id': id)
    when 'edit' then
      path.delete_at(-1)
      path << ((id.empty?) ? ':id': id)
      path << 'edit'
    end
    path = path.join('/')
    "/#{path}"
  end

  def symbols
    []
  end

  def hydraulik_list
    ul do
      yield
    end
  end

  def hydraulik_form
    form do
      hydraulik_inputs(symbols) do
        hydraulik_submit(symbols) do |values|
          yield(values)
        end
      end
    end
  end

  def hydraulik_inputs(types)
    types.map do |type|
      if type.type == 'submit'
        hydraulik_input(type) do |input|
          input.on(:click) do |event|
            event.prevent_default
            yield
          end
        end
      else
        hydraulik_input(type)
      end
    end
  end

  def hydraulik_input(type)
    if block_given?
      i = input(type: "submit", value: "Post")
      yield(i)
    else
      name = type.name.downcase.to_sym
      i = input type: type.type, placeholder: type.placeholder, ref: type.name.downcase
      label { errors[name] } if errors.has_key?(name)
    end
  end

  def get_ref_value(symbol)
    self.refs[symbol].dom_node.value.strip
  end

  def get_ref_values(symbols)
    symbols.map do |symbol|
      { symbol: symbol, value: get_ref_value(symbol) }
    end
  end

  def hydraulik_submit(symbols)
    # get the value
    symbols = symbols.reject { |symbol| symbol.type == 'submit' }.map { |symbol| symbol.name.downcase }

    ref_values = get_ref_values(symbols)

    # validate
    validators = ref_values.map do |ref_value|
      type = ref_value[:symbol].to_s.capitalize.to_sym
      value = Kernel.const_get(type).new(ref_value[:value])
      [value.validate, ref_value[:symbol]]
    end

    invalids = validators.reject { |v| v[0].valid? }

    if invalids.empty?
      # set
      values = ref_values.map { |value| { value[:symbol] => value[:value] } }.reduce { |a, b| a.merge(b) }
      yield(values)
    else
      self.errors = invalids.map { |invalid| { invalid[1] => invalid[0].msg } }.reduce { |a, b| a.merge(b) }
    end
  end
end

