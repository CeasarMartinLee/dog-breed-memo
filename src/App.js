import React, { Component } from 'react';
import './App.css';
import AppRootScreen from './components/AppRootScreen'

import GameScreenContainer from './components/GameScreenContainer'

import { Provider } from 'react-redux'
import store from './store/store'
import AppContainer from './components/AppContainer'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <GameScreenContainer />
      </Provider>
    );
  }
}

export default App;