import React, { Component } from 'react';
import './App.css';
import GameScreen from './components/GameScreen'

import GameScreenContainer from './components/GameScreenContainer'

import { Provider } from 'react-redux'
import store from './store/store'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <GameScreenContainer/>
        <GameScreen>

        </GameScreen>
      </Provider>
    );
  }
}

export default App;