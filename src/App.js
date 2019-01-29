import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GameScreen from './components/GameScreen'

import GameScreenContainer from './components/GameScreenContainer'

import { Provider } from 'react-redux'
import store from './store/store'


class App extends Component {
  render() {
    return (
      <GameScreen>

      </GameScreen>
    );
  }
}

export default App;