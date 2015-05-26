import { EventEmitter } from 'events'

var CHANGE_EVENT = 'change'
var ERROR_EVENT  = 'error'

export default Object.assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  },

  emitError: function() {
    this.emit(ERROR_EVENT)
  },

  addErrorListener: function(callback) {
    this.on(ERROR_EVENT, callback)
  },

  removeErrorListener: function(callback) {
    this.removeListener(ERROR_EVENT, callback)
  }
})
