import { combineReducers } from 'redux'
import breeds from './breeds'
import ui from './ui'
import game from './game'

export default combineReducers({
  breeds,
  game,
  ui
})