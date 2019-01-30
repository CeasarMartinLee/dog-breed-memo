import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Styles.css'
import posed, { PoseGroup } from 'react-pose'
import AppBackground from './AppBackground'
import GameScreen from './GameScreen'
import StartMenuScreen from './StartMenuScreen'

//hrtslg


const GroupContainer = posed.div({
  enter: {
    opacity: 0,
    scale: 0.8,
    y: 400
  },
  exit: {
    opacity: 1,
    scale: 1.0,
    y: 0,
    transition: { scale: { type: 'spring', stiffness: 300, damping: 15, duration: 500 } }
  }
})

class AppRootScreen extends Component {

  state = {
    activeScreen: 'start-menu'
  }

  handleAnswer = correct => {
    if (!this.state.isAnswered) {
      this.setState({
        currentBackgroundState: 'green',
        isAnswered: true,
        showGameArea: 'questionAnswered'
      })
    }
  }

  updateState = () => {
    this.setState({
      activeScreen: 'game'
    })
    console.log('State changed')
  }

  componentDidMount = () => {
    setTimeout(this.updateState, 3000)
  }

  renderActiveElement(activeState) {
    console.log('Render', activeState)

    switch (activeState) {
      case 'start-menu':
        return <StartMenuScreen key='menu-screen' />
      case 'game':
        return <GameScreen key='game-screen' />
      default:
        return
    }
  }

  render() {
    return (
      <AppBackground colorState='mainMenu'>
        <PoseGroup>
          {this.renderActiveElement(this.state.activeScreen)}
        </PoseGroup>
      </AppBackground>
    )
  }
}

AppRootScreen.propTypes = {};

export default AppRootScreen;