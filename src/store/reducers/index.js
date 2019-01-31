import { combineReducers } from 'redux'
import breeds from './breeds'
import ui from './ui'

export default combineReducers({
  breeds, ui
})