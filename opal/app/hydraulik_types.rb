class Validator
  attr_reader :msg

  def initialize(msg)
    @msg = msg.nil? ? '' : msg
    @valid = @msg.length == 0
  end

  def valid?
    @valid
  end
end

class ValidatorError < Exception
end

class Type
  def initialize(value)
    @value = value
  end

  def validator
  end

  def validate
    msg = ''
    validator
  rescue ValidatorError => e
    msg = e.message
  ensure
    return Validator.new msg
  end
end

class Status < Type
  def self.type
    'text'
  end

  def self.placeholder
    'placeholder'
  end

  def validator
    fail ValidatorError, 'status is too short' unless (2..140).include?(@value.length)
  end
end

class Submit
  def self.type
    'submit'
  end
end

class Store < Array
  def find(id)
    element = self.select { |s| s[:id] == id } || []
    element[0] || {}
  end

  def <<(hash)
    random_string = SecureRandom.uuid
    super(hash.merge({id: random_string}))
  end

  def delete(id)
    self.delete_if { |s| s[:id] == id }
  end

  def edit(id, hash)
    element = find(id)
    element.merge!(hash)
  end
end

