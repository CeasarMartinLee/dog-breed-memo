import { combineReducers } from 'redux'
import breeds from './breeds'
import game from './game'

export default combineReducers({
  breeds,
  game
})