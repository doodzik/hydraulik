require 'bundler/gem_tasks'
require 'rspec/core/rake_task'
require 'rubocop/rake_task'

ENV['TEST_SOURCE'] = 'rake'

RuboCop::RakeTask.new
RSpec::Core::RakeTask.new(:spec)

task default: [:spec, :rubocop]
