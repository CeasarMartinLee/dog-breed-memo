import { createStore, compose, applyMiddleware } from 'redux'
import reducers from './reducers'
import ReduxThunk from 'redux-thunk'


const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const enhancer = compose(applyMiddleware(ReduxThunk), devTools)

const store = createStore(reducers, enhancer)

export default store