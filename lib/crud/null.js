export default class NullCrud {
  matches(_actionType){
    return false
  }

  exists(){
    return false
  }
}
