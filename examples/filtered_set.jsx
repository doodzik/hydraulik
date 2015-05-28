import React      from 'react/addons'
import dispatcher from './dispatcher'
import { Schema, Store, Flux } from '../src/hydraulik'
import { Str } from 'hydraulik-types'

var schema = new Schema('Name').type(Str).as('name')
var store  = new Store(schema)
store.filter((val) => {
  return 'Second' == val.name || 'Third' == val.name
})
var Names  = new Flux(store, dispatcher)

Names.create({ name: 'First'})
Names.create({ name: 'Second' })

export default FilteredSet = React.createClass({
  mixins: [Names.mixin()],

  onClick: function() {
    Names.create({ name: 'Third' })
    Names.create({ name: 'Fourth' })
  },

  render: function() {
    var names = this.state.Name
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
