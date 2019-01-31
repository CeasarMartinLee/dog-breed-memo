import React, { Component } from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose'
import './Styles.css'

const PosedAnswerButton = posed.div({
  hoverable: true,
  pressable: true,
  init: {
    backgroundImage: 'linear-gradient(to right top, #051937, #051937, #051937, #051937, #051937)',
    scale: 1.0,
    color: '#ffffff',
    transform: {
      duration: 500
    }
  },
  hover: {
    backgroundImage: 'linear-gradient(to right top, #ffe039, #ffe039, #ffe039, #ffe039, #ffe039)',
    scale: 1.1,
    color: '#051937',
    transform: {
      duration: 500
    }
  },
  press: {
    backgroundImage: 'linear-gradient(to right top, #ffe039, #ffe039, #ffe039, #ffe039, #ffe039)',
    scale: 1.05,
    color: '#051937',
    transform: {
      duration: 500
    }
  }
})

class AnswerButton extends Component {

  handleClick = () => {
    console.log('Click reg: Button')
    this.props.onAnswer(this.props.isCorrect)
  }

  render() {
    return (
      <PosedAnswerButton className='option' onClick={this.handleClick}>
        {this.props.children}
      </PosedAnswerButton>
    )
  }
}

AnswerButton.propTypes = {
  onAnswer: PropTypes.func.isRequired,
  isCorrect: PropTypes.bool.isRequired
};

export default React.forwardRef((props, innerRef) => <AnswerButton ref={innerRef} {...props}/>);
