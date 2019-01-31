import React, { Component } from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose'
import './Styles.css'

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
    console.log('Rerender bkgnd', this.props.colorState)
    return (
      <AppBackgroundContainer pose={this.props.colorState} className='game-screen' {...this.props}>
        {this.props.children}
      </AppBackgroundContainer>
    )
  }
}

AppBackground.propTypes = {
  colorState: PropTypes.string
};

export default React.forwardRef((props, innerRef) => <AppBackground ref={innerRef} {...props} />);