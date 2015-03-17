require 'bundler/gem_tasks'
require 'rspec/core/rake_task'
require 'rubocop/rake_task'
require 'reek/rake/task'
require 'mutant'
# require 'mutant-rspec'

ENV['TEST_TYPE'] = 'rake'

RuboCop::RakeTask.new
Reek::Rake::Task.new(:reek)
RSpec::Core::RakeTask.new(:spec)

desc 'Run Mutation Specs'
task :mutant do
  ENV['TEST_TYPE'] = 'mutate'
  mutant_config = %w(--include lib --require hydraulik --use rspec Hydraulik*)
  result = Mutant::CLI.run(mutant_config)
  fail unless result == Mutant::CLI::EXIT_SUCCESS
end

task default: [:spec, :rubocop, :reek]
