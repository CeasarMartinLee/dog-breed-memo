import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './GameScreen.css'
import posed, { PoseGroup } from 'react-pose'
import Baffle from 'baffle-react'

const AnswerBttn = posed.div({
  hoverable: true,
  pressable: true,
  init: {
    // backgroundColor: '#c1c1c1',
    backgroundImage: 'linear-gradient(to right top, #051937, #051937, #051937, #051937, #051937)',
    scale: 1.0,
    color: '#ffffff',
    transform: {
      duration: 500
    }
  },
  hover: {
    // backgroundColor: '#5EFF9B',
    backgroundImage: 'linear-gradient(to right top, #ffe039, #ffe039, #ffe039, #ffe039, #ffe039)',
    scale: 1.1,
    color: '#051937',
    transform: {
      duration: 500
    }
  },
  press: {
    // backgroundColor: '#5EFF9B',
    backgroundImage: 'linear-gradient(to right top, #ffe039, #ffe039, #ffe039, #ffe039, #ffe039)',
    scale: 1.05,
    color: '#051937',
    transform: {
      duration: 500
    }
  },
  answered: {
    // backgroundColor: '#c1c1c1',
    backgroundImage: 'linear-gradient(to right top, #051937, #051937, #051937, #051937, #051937)',
    scale: 1.0,
    color: '#ffffff',
    transform: {
      duration: 500
    }
  }
})

const GameScreenBackground = posed.div({
  normal: {
    backgroundImage: 'linear-gradient(to right top, #051937, #003e65, #006883, #009188, #00b975)'
  },
  red: {
    backgroundImage: 'linear-gradient(to right top, #ff00a2, #f6007c, #e70059, #d4003a, #bd081d)'
  },
  green: {
    backgroundImage: 'linear-gradient(to right top, #00ff18, #00ff30, #00ff41, #00ff4e, #00ff5a)'
  },
  mainMenu: {
    backgroundImage: 'linear-gradient(to right top, #1e5ebb, #1150b6, #0b41af, #1032a7, #1a1f9e)'
  }
})

const GameArea = posed.div({
  questionNotReady: {
    opacity: 0,
    y: 50
  },
  showQuestion: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 1000, damping: 15, duration: 300 }
  },
  questionAnswered: {
    opacity: 0,
    y: 0,
    scale: 0.6,
    transition: { ease: 'easeInOut', duration: 200 }
  }
})
//hrtslg
class GameScreen extends Component {

  state = {
    showQuestion: false,
    isAnswered: false,
    answeredCorrectly: false,
    currentBackgroundState: 'normal',
    showGameArea: 'questionNotReady'
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

  render() {
    if (this.state.showQuestion) {
      return (
        <GameScreenBackground className='gameScreen' pose={this.state.currentBackgroundState}>
          <GameArea className='game-area' pose={this.state.showGameArea}>
            <div className='img-container-box'>
              <img className='question-img'
                   src='https://3c1703fe8d.site.internapcdn.net/newman/csz/news/800/2018/2-dog.jpg'
                   alt='' />
            </div>
            <div className='question-text'>What breed is the dog on the picture?</div>
            <div className='answers-container'>
              <AnswerBttn onClick={this.handleAnswer}
                          className='option'>Alpaca</AnswerBttn>
              <AnswerBttn onClick={this.handleAnswer}
                          className='option'>Humaracha</AnswerBttn>
              <AnswerBttn onClick={this.handleAnswer}
                          className='option'>Bullodogo</AnswerBttn>
            </div>
          </GameArea>
        </GameScreenBackground>)
    } else {

      return (
        <GameScreenBackground className='gameScreen' pose='mainMenu'>
          <div className='main-menu-container'>
            <MainMenuText key='main-menu-text-1' className='main-menu-l1'><b>Hello,</b></MainMenuText>
            <MainMenuText key='main-menu-text-2' className='main-menu-l1'>Wanna start me?</MainMenuText>
          </div>
        </GameScreenBackground>

      )
    }
  }
}

const MainMenuText = posed.div({
  hoverable: true,
  init: {
    // color: '#ffffff',
    scale: 1,
    transition: { type: 'spring', stiffness: 500, damping: 15, duration: 300 }
  },
  hover: {
    // color: '#00b975',
    scale: 1.2,
    transition: { type: 'spring', stiffness: 500, damping: 15, duration: 300 }
  }

})

GameScreen.propTypes = {};

export default GameScreen;