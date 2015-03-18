# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'hydraulik/version'

Gem::Specification.new do |spec|
  spec.name          = 'hydraulik'
  spec.version       = Hydraulik::VERSION
  spec.authors       = ['doodzik']
  spec.email         = ['frederik.dudzik@gmail.com']

  spec.summary       = %q(
    TODO: Writ"'e a short summary, because Rubygems requires one.
  )
  spec.description   = %q(
    TODO: Write a longer descript'"ion or delete this line.
  )
  spec.homepage      = 'TODO: Put your gems website or public repo URL here.'
  spec.license       = 'GPL'

  spec.files         = `git ls-files -z`.split("\x0")
    .reject { |f| f.match(/^(test|spec|features)\//) }
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(/^exe\//) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  spec.add_development_dependency 'bundler', '~> 1.7'
  spec.add_development_dependency 'rake', '~> 10.0'
  spec.add_development_dependency 'rspec'
  spec.add_development_dependency 'rubocop'
  spec.add_development_dependency 'reek'

  spec.add_dependency 'vote_init'
end
