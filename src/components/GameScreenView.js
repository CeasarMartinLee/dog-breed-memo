import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Styles.css'
import Question from './Question'

class GameScreenView extends Component {

  state = {
    question: {
      questionImgUrl: 'https://images.dog.ceo/breeds/eskimo/n02109961_17082.jpg',
      answers: [
        {
          answer: 'Bouvier',
          isCorrect: false
        }, {
          answer: 'Eskimo',
          isCorrect: true
        }, {
          answer: 'Shihtzu',
          isCorrect: false
        }
      ]
    }
  }

  question = {}

  handleAnswer = (correctly) => {
    this.props.nextQuestion(correctly)
  }

  render() {
    return (
      <div>
        <Question question={this.props.question} answerHandler={this.props.answerHandler} />
      </div>
    )
  }
}

GameScreenView.propTypes = {
  question: PropTypes.object.isRequired,
  nextQuestion: PropTypes.func.isRequired
};

export default React.forwardRef((props, innerRef) => <GameScreenView ref={innerRef} {...props} />);