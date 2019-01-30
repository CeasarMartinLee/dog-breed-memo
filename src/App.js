import React, { Component } from 'react';
import './App.css';
import AppRootScreen from './components/AppRootScreen'

import GameScreenContainer from './components/GameScreenContainer'

import { Provider } from 'react-redux'
import store from './store/store'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        {/*<GameScreenContainer/>*/}
        <AppRootScreen />

      </Provider>
    );
  }
}

export default App;