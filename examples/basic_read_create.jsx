import React      from 'react/addons'
import dispatcher from './dispatcher'
import { Schema, Store, Flux } from '../lib/hydraulik'

var schema = new Schema('Names')
var Names  = new Flux(new Store(schema), dispatcher)

Names.create('First')

export default CheckboxWithLabel = React.createClass({
  mixins: [Names.mixin()],

  onClick: function() {
    Names.create('Second')
  },

  render: function() {
    var names = this.state.Names
    var lis   = names.map(function(name, index){
      return(
        <li key={index}>{name}</li>
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
