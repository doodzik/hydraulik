$LOAD_PATH.unshift File.expand_path('../../lib', __FILE__)

if ENV['TEST_SOURCE'] == 'rake'
  require 'simplecov'
  SimpleCov.start
  SimpleCov.minimum_coverage 95
  SimpleCov.refuse_coverage_drop
end
