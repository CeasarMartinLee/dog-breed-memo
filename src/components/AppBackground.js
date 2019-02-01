import React, { Component } from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose'
import './Styles.css'
import { connect } from 'react-redux'

const AppBackgroundContainer = posed.div({
  game: {
    backgroundImage: 'linear-gradient(to right top, #051937, #003e65, #006883, #009188, #00b975)'
  },
  answerWrong: {
    backgroundImage: 'linear-gradient(to right top, #ff00a2, #f6007c, #e70059, #d4003a, #bd081d)'
  },
  answerCorrect: {
    backgroundImage: 'linear-gradient(to right top, #00ff18, #00ff30, #00ff41, #00ff4e, #00ff5a)'
  },
  startScreen: {
    backgroundImage: 'linear-gradient(to right top, #1e5ebb, #1150b6, #0b41af, #1032a7, #1a1f9e)'
  }
})

class AppBackground extends Component {

  render() {

    const playerPerformance = Math.floor(this.props.game.currentPerformance.numOfCorrect / this.props.game.currentPerformance.numOfAnsweredQuestions * 100).toString() + '%'

    return (
      <AppBackgroundContainer pose={this.props.colorState} className='game-screen' {...this.props}>
        {this.props.game.currentPerformance.numOfAnsweredQuestions > 0 &&
        <div className='game-stats-container'>{playerPerformance}<span>answers correct</span></div>}
        {this.props.children}
      </AppBackgroundContainer>
    )
  }
}

AppBackground.propTypes = {
  colorState: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    game: state.game
  }
}

export default connect(mapStateToProps, {})(React.forwardRef((props, innerRef) => <AppBackground
  ref={innerRef} {...props} />))
