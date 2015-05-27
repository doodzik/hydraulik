import React      from 'react/addons'
import dispatcher from './dispatcher'
import { Schema, Store, Flux } from '../lib/hydraulik'
import Str from '../lib/types/str'

var schema = new Schema('Names').type(Str).as('name')
var Names  = new Flux(new Store(schema), dispatcher)

Names.create({ name: 'First'})

export default CheckboxWithLabel = React.createClass({
  mixins: [Names.mixin()],

  onClick: function() {
    Names.create({ name: 'Second' })
  },

  render: function() {
    var names = this.state.Names
    var lis   = names.map(function(name, index){
      return(
        <li key={index}>{name.name}</li>
      )
    })
    return (
      <div>
        <ul>
          { lis }
        </ul>
        <button onClick={this.onClick} />
      </div>
    )
  }
})
