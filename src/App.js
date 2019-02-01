import React, { Component } from 'react';
import './App.css';

import GameScreenContainer from './components/GameScreenContainer'

import { Provider } from 'react-redux'
import store from './store/store'

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