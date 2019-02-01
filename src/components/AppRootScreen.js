import React, { Component } from 'react';
import './Styles.css'
import posed, { PoseGroup } from 'react-pose'
import AppBackground from './AppBackground'
import StartMenuView from './StartMenuView'
import GameScreenView from './GameScreenView'
import LoadingScreen from './LoadingScreen'
import { connect } from 'react-redux'
import { updateUIState } from '../store/actions/ui'
import {setActiveQuestion} from '../store/actions/game'

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
    backgroundState: 'start',
    activeScreen: 'start'
  }

  nextQuestion = (wasPreviousAnswerCorrect) => {
    console.log( 'a',this.props.activeQuestion)
    this.setState({
      backgroundState: wasPreviousAnswerCorrect ? 'answerCorrect' : 'answerWrong',
      wasPreviousAnswerCorrect: wasPreviousAnswerCorrect,
      infoScreenBiggerText: wasPreviousAnswerCorrect ? "Nice!" : 'Nope.',
      infoScreenSmallerText: wasPreviousAnswerCorrect ? "You're not bad." : (this.props.activeQuestion.questionType === 'type1' ? `It was an ${this.props.activeQuestion.correctAnswerIs}.` : `It was the pic #${this.props.activeQuestion.correctAnswerIs}.`),
      infoScreenTextColor: wasPreviousAnswerCorrect ? '#333333' : '#ffffff',
      activeScreen: 'info'
    })

    this.props.answerHandler(wasPreviousAnswerCorrect)

    setTimeout(() => this.setState({
      backgroundState: 'game',
      activeScreen: 'game'
    }), 3000)
    console.log(this.props)
    this.props.generateQuestion() //bug-investigate nextQuestion- added this line
  }

  startGame = () => {
    this.setState({
      backgroundState: 'game',
      activeScreen: 'game'
    })
  }

  renderActiveElement = (activeState) => {

    // this.props.setActiveQuestion(this.props.activeQuestion)

    switch (activeState) {
      case 'start':
        return (
          <Container key='menu-container' className='main-menu-container'>
            <StartMenuView key='menu-screen' uiHandler={this.startGame} />
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
            <LoadingScreen key='game-screen-2' showLoading={true} biggerText={this.state.infoScreenBiggerText}
                           smallerText={this.state.infoScreenSmallerText} textColor={this.state.infoScreenTextColor} />
          </Container>
        )
      default:
        return
    }
  }

  render() {
    return (
      <AppBackground colorState={this.state.backgroundState}>

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

const mapStateToProps = (state) => {
  return {
    breeds: state.breeds,
    uiState: state.ui,
    game: state.game
  }
}

export default connect(mapStateToProps, {
  updateUIState,
  setActiveQuestion
})(AppRootScreen)