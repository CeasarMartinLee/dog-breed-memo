import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Styles.css'
import posed, { PoseGroup } from 'react-pose'
import AppBackground from './AppBackground'
import StartMenuView from './StartMenuView'
import GameScreenView from './GameScreenView'
import LoadingScreen from './LoadingScreen'
import { connect } from 'react-redux'
import { cutBreedIntoActive, getBreedsFromAPI, getImages, getImagesFromAPI } from '../store/actions/breeds'
import { updateUIState } from '../store/actions/ui'

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


  nextQuestion = (wasPreviousAnswerCorrect) => {
    this.props.updateUIState({
      backgroundState: wasPreviousAnswerCorrect ? 'answerCorrect' : 'answerWrong',
      wasPreviousAnswerCorrect: wasPreviousAnswerCorrect,
      infoScreenBiggerText: wasPreviousAnswerCorrect ? "Nice!" : 'Nope.',
      infoScreenSmallerText: wasPreviousAnswerCorrect ? "That's a good breed choice!" : 'How can you not know that?',
      infoScreenTextColor: wasPreviousAnswerCorrect ? '#333333' : '#ffffff',
      activeScreen: 'info'
    })
    this.props.answerHandler(wasPreviousAnswerCorrect)
    setTimeout(() => this.props.updateUIState({
      backgroundState: 'game',
      activeScreen: 'game'
    }), 3000)
  }

  renderActiveElement = (activeState) => {

    console.log('PROPS', this.props.activeQuestion)

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
            <GameScreenView key='game-screen' question={this.props.activeQuestion} answerHandler={this.nextQuestion} />
          </Container>
        )
      case 'info':
        return (
          <Container key='menu-container-a' className='main-menu-container'>
            <LoadingScreen key='game-screen-2' showLoading={true} biggerText={this.props.uiState.infoScreenBiggerText}
                           smallerText={this.props.uiState.infoScreenSmallerText} textColor={this.props.uiState.infoScreenTextColor} />
          </Container>
        )
      default:
        return
    }
  }

  render() {
    console.log('AppRootScreen did rerender with ', this.props)
    return (
      <AppBackground colorState={this.props.uiState.backgroundState}>

        <PoseGroup animateOnMount='true'>
          {
            this.renderActiveElement(this.props.uiState.activeScreen)
          }
        </PoseGroup>
      </AppBackground>
    )
  }
}

AppRootScreen.propTypes = {};

const mapStateToProps = (state) => {
  return {
    breeds: state.breeds,
    uiState: state.ui
  }
}

export default connect(mapStateToProps, {
  updateUIState
})(AppRootScreen)