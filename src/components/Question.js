import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnswerButton from './AnswerButton'
import posed from 'react-pose'

const Container = posed.div({
  stateBefore: {
    opacity: 0,
    scale: 0.6,
    x: 500,
    transition: {
      scale: { type: 'spring', stiffness: 1000, damping: 15 },
      x: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  stateActive: {
    opacity: 1,
    scale: 1.0,
    x: 0,
    transition: {
      scale: { type: 'spring', stiffness: 1000, damping: 15 },
      x: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  stateAfter: {
    opacity: 0,
    scale: 0.3,
    transition: {
      scale: { ease: 'easeOut' },
      x: { ease: 'easeOut' },
      default: { duration: 100 }
    }
  }
})

class Question extends Component {

  playerDidAnswer = (correctly) => {
    console.log('Click reg: Question')
    this.props.answerHandler(correctly)
  }

  render() {
    if (this.props.question) {
      return (
        <Container pose='stateActive' className='question-container'>
          <div className='img-container-box'>
            <img className='question-img'
                 src={this.props.question.questionImgUrl}
                 alt='' />
          </div>
          <div className='question-text'>What breed is the dog on the picture?</div>
          <div className='answers-container'>
            <AnswerButton isCorrect={this.props.question.answers[0].isCorrect}
                          onAnswer={this.playerDidAnswer}>{this.props.question.answers[0].answer}</AnswerButton>
            <AnswerButton isCorrect={this.props.question.answers[1].isCorrect}
                          onAnswer={this.playerDidAnswer}>{this.props.question.answers[1].answer}</AnswerButton>
            <AnswerButton isCorrect={this.props.question.answers[2].isCorrect}
                          onAnswer={this.playerDidAnswer}>{this.props.question.answers[2].answer}</AnswerButton>
          </div>
        </Container>
      )
    } else {
      return <div></div>
    }
  }
}

Question.propTypes = {};

export default Question;