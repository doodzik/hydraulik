import setEvents            from './setEvents'
import assign               from 'object-assign'
import React, { Component } from "react"

export default class ObserverSubset {
  constructor(set, dispatcher, events = assign({}, setEvents)) {
    this.set        = set
    this.dispatcher = dispatcher
    this.events     = events
    this.baseSet    = this.set.subsetOf || this.set
  }

  create(argObj){
    var actionType = this.baseSet.actionType
    this.dispatcher.dispatch({ actionType, argObj })
  }

  getStateObj(props){
    return { [this.set.name]: this.set.read(props) }
  }

  getStateObjError(){
    return { [this.set.name + '_error']: this.set.error }
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
