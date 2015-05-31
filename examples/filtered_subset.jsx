import React      from 'react/addons'
import dispatcher from './dispatcher'
import { Schema, Store, Flux, Stores, StoresBuild, Fluxes } from '../src/hydraulik'
import { Str } from 'hydraulik-types'

var Name = new Schema('Name').type(Str).as('name')
Name.filter(val => 'Second' == val.name || 'Third' == val.name)
var Name2 = new Schema('Name2').subset(Name)
Name2.filter(val => 'Third' == val.name)

var stores = new Stores(Store)
stores.register(Name)
stores.register(Name2)

var storesBuild = new StoresBuild(stores)
var fluxes      = new Fluxes(storesBuild, dispatcher).fluxes
var Names       = fluxes.Name
var Names2      = fluxes.Name2

Names.create({ name: 'First'})
Names.create({ name: 'Second' })

export default FilteredSubset = React.createClass({
  mixins: [Names2.mixin()],

  onClick: function() {
    Names.create({ name: 'Third' })
    Names.create({ name: 'Fourth' })
  },

  render: function() {
    var names = this.state.Name2
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
