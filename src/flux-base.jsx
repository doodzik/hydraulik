import EventStore from './EventStore'
import assign from 'object-assign'
import React, { Component } from "react"

export default class FluxBase {
  constructor(store, dispatcher, events = assign({}, EventStore)) {
    this.store      = store
    this.dispatcher = dispatcher
    this.events     = events
    this.baseStore  = this.store.subsetOf || this.store
  }

  create(argObj){
    var actionType = this.baseStore.actionType
    this.dispatcher.dispatch({ actionType, argObj })
  }

  getStateObj(props){
    return { [this.store.name]: this.store.read(props) }
  }

  getStateObjError(){
    return { [this.store.name + 'Error']: this.store.error }
  }

  Component(ComposedComponent) {
    var _this = this
    return class extends Component {
      constructor() {
        super()
        this.state = _this.getStateObj(this.props)
      }

      componentDidMount() {
        _this.events.addChangeListener(this._onChangeFn.bind(this))
      }

      componentWillUnmount() {
        _this.events.removeChangeListener(this._onChangeFn.bind(this))
      }

      _onChangeFn() {
         this.setState(_this.getStateObj(this.props))
      }

      render() {
        return <ComposedComponent {...this.props} {...this.state} />
      }
    }
  }

  ComponentError(ComposedComponent) {
    var _this = this
    return class extends Component {
      constructor() {
        super()
        this.state = _this.getStateObjError()
      }

      componentDidMount() {
        _this.events.addErrorListener(this._onChangeFn.bind(this));
      }

      componentWillUnmount() {
        _this.events.removeErrorListener(this._onChangeFn.bind(this));
      }

      _onChangeFn() {
         this.setState(_this.getStateObjError());
      }

      render() {
        return <ComposedComponent {...this.props} {...this.state} />
      }
    }
  }
}
