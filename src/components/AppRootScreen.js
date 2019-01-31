import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Styles.css'
import posed, { PoseGroup } from 'react-pose'
import AppBackground from './AppBackground'
import StartMenuView from './StartMenuView'
import GameScreenView from './GameScreenView'
import LoadingScreen from './LoadingScreen'

const Container = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  }
})

class AppRootScreen extends Component {

  state = {
    activeScreen: 'game',
    backgroundState: 'normal'
  }

  nextQuestion = (wasPreviousAnswerCorrect) => {
    this.setState({
      backgroundState: wasPreviousAnswerCorrect ? 'answerCorrect' : 'answerWrong',
      wasPreviousAnswerCorrect: wasPreviousAnswerCorrect,
      infoScreenBiggerText: wasPreviousAnswerCorrect ? "Nice!" : 'Nope.',
      infoScreenSmallerText: wasPreviousAnswerCorrect ? "That's a good breed choice!" : 'How can you not know that?',
      infoScreenTextColor: wasPreviousAnswerCorrect ? '#333333' : '#ffffff',
      activeScreen: 'info'
    })
    setTimeout(() => this.setState({
      backgroundState: 'normal',
      activeScreen: 'game'
    }), 3000)
  }

  renderActiveElement = (activeState) => {

    switch (activeState) {
      case 'start':
        return (
          <Container key='menu-container' className='main-menu-container'>
            <StartMenuView key='menu-screen' />
          </Container>
        )
      case 'game':
        return (
          <Container key='game-container' className='game-area'>
            <GameScreenView key='game-screen' nextQuestion={this.nextQuestion}/>
          </Container>
        )
      case 'info':
        return (
          <Container key='menu-container-a' className='main-menu-container'>
            <LoadingScreen key='game-screen-2' showLoading={true} biggerText={this.state.infoScreenBiggerText} smallerText={this.state.infoScreenSmallerText} textColor={this.state.infoScreenTextColor} />
          </Container>
        )
      default:
        return
    }
  }

  render() {
    return (
      <AppBackground colorState={this.state.backgroundState}>
        {/*<div className='testDiv' onClick={() => {*/}
          {/*this.setState({*/}
            {/*activeScreen: this.state.activeScreen === 'game' ? 'start-menu' : 'game'*/}
          {/*})*/}
        {/*}}>Test*/}
        {/*</div>*/}
        <PoseGroup animateOnMount='true'>
          {
            this.renderActiveElement(this.state.activeScreen)
          }
        </PoseGroup>
      </AppBackground>
    )
  }
}

AppRootScreen.propTypes = {};

export default AppRootScreen;