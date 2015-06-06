import { EventEmitter } from 'events'
import assign           from 'object-assign'

var CHANGE_EVENT = 'change'
var ERROR_EVENT  = 'error'

export default assign({}, EventEmitter.prototype, {
  emitChange() {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  emitError() {
    this.emit(ERROR_EVENT)
  },

  addErrorListener(callback) {
    this.on(ERROR_EVENT, callback)
  },

  removeErrorListener(callback) {
    this.removeListener(ERROR_EVENT, callback)
  }
})
