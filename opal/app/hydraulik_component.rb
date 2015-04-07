require 'securerandom'

# TODO $Post store to $Store
$Post = Store.new
$Post << {status: 'hi World'} << {status: 'bye World' }

class PostList < HHelper
  include React::Component

  define_state(:list) { [] }

  after_mount do
    self.list = $Post
  end

  def render
    hydraulik_list do
      li { 'no posts' } if self.list.length == 0
      self.list.map do |item|
        li do
          a(href: "##{PostEdit.route(item[:id])}") { item[:status] }
          present PostDelete, id: item[:id]
        end
      end
    end
  end
end

class PostShow
  include React::Component

  define_state(:post) { {} }

  after_mount do
    self.item = $Post.find(params[:id])
  end

  def render
    #TODO iterate over symbols list
    div do
      if item.empty?
        'no such post'
      else
        item[:status]
      end
    end
  end
end

class PostCreate < HHelper
  include React::Component

  define_state(:errors) { {} }

  def symbols
    [Status, Submit]
  end

  def render
    hydraulik_form do |values|
      $Post << (values) # store
      Router.navigate(PostList.route) # transition
    end
  end
end

class PostEdit < HHelper
  include React::Component

  define_state(:errors) { {} }
  define_state(:item) { {} }

  after_mount do
    # TODO hydraulik_edit_defaults
    self.item = $Post.find(params[:id])
    # set default values
    unless item.empty?
      refs[:status].getDOMNode().value = self.item[:status]
    end
  end

  def symbols
    [Status, Submit]
  end

  def render
    if item.empty?
      div { 'no such post' }
    else
      hydraulik_form do |values|
        $Post.edit(params[:id], values) # save
        Router.navigate(PostList.route) # transition
      end
    end
  end
end

class PostDelete < HHelper
  include React::Component

  # TODO Submit should hold value
  def symbols
    [Submit]
  end

  def render
    hydraulik_form do
        $Post.delete(params[:id])
        Router.navigate(PostList.route)
        Router.update
    end
  end
end
