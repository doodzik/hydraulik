import React      from 'react/addons'
import dispatcher from './dispatcher'
import { Schema, Store, Flux } from '../src/hydraulik'
import { Str } from 'hydraulik-types'

var schema = new Schema('Name').type(Str).as('name')
var Names  = new Flux(new Store(schema), dispatcher)

Names.create({ name: 'First'})

export default BasicErrorHandling = React.createClass({
  mixins: [Names.mixinError()],

  onClick: function() {
    Names.create({ name: '' })
  },

  render: function() {
    return (
      <div>
        <span>
          { this.state.NameError.name }
        </span>
        <button onClick={this.onClick} />
      </div>
    )
  }
})
