module Hydraulik
  class Type
    def validate(value)
    end

    def process(value)
    end
  end

  class String < Type
    @string_length = 0
    @range = 0..512
    @type   = :text

    def validate(value)
      @string_length = value.length
      return ValidationError if @range.member? @string_length
    end
  end
end
