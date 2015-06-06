import ObserverSet    from './observerSet'
import ObserverSubset from './observerSubset'
import { Dispatcher } from 'flux'

export default class ObserverKlass {
  constructor(klass) {
    var klassBuild     = klass.build()
    this.sets          = {}
    this.dispatcher    = new Dispatcher()
    this.setsBase      = klassBuild.baseSets
    this.setsSub       = klassBuild.subSets
    this.setBaseSets()
    this.setSubSets()
  }

  setBaseSets(){
    for (var set in this.setsBase) {
      if (!this.setsBase.hasOwnProperty(set)) continue
      this.sets[set] = new ObserverSet(this.setsBase[set], this.dispatcher)
    }
  }

  setSubSets(){
    var _set, baseEvent
    for (var set in this.setsSub) {
      if (!this.setsSub.hasOwnProperty(set)) continue
      _set           = this.setsSub[set]
      baseEvent      = this.observerKlass[_set.schema.subsetOf.name].events
      this.sets[set] = new ObserverSubset(_set, this.dispatcher, baseEvent)
    }
  }
}
