import { createStore, compose } from 'redux'
import reducers from './reducers'


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const enhancer = compose(
  devTools
)

const store = createStore(reducers, enhancer)

export default store