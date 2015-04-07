require 'opal'
require 'jquery'
require 'opal-jquery'
require 'vienna'
require "react"
require 'hydraulik_types'
require 'hydraulik_helper'
require 'hydraulik_component'

class Nav
  include React::Component

  # TODO less typing
  def render
    ul do
      li { a(href: "##{PostList.route}") { 'Posts' } }
      li { a(href: "##{PostCreate.route}") { 'Create' } }
    end
  end
end

Document.ready? do
  # rename constants with dollar signs
  Router  = Vienna::Router.new
  Content = Element.find('#content').get(0)
  $nav    = Element.find('#nav').get(0)

  element = React.create_element(Nav)
  React.render(element, $nav)

  # TODO Router build from links in navigation builder
  Router.tap do |router|
    router.route('/') do |params|
      element = React.create_element(PostList)
      React.render(element, Content)
    end

    router.route(PostList.route) do |params|
      element = React.create_element(PostList)
      React.render(element, Content)
    end

    router.route(PostCreate.route) do |params|
      element = React.create_element(PostCreate)
      React.render(element, Content)
    end

    router.route(PostEdit.route) do |params|
      element = React.create_element(PostEdit, id: params[:id])
      React.render(element, Content)
    end
  end.update
end
