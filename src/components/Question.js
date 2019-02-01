import React, { Component } from 'react';
import AnswerButton from './AnswerButton'
import posed from 'react-pose'
import { connect } from 'react-redux'

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

  render() {
    const playerPerformance = Math.floor(this.props.game.currentPerformance.numOfCorrect / this.props.game.currentPerformance.numOfAnsweredQuestions * 100).toString() + '%'

    if (this.props.question && this.props.question.questionType === 'type1') {
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
                          onAnswer={this.props.answerHandler}>{this.props.question.answers[0].answer}</AnswerButton>
            <AnswerButton isCorrect={this.props.question.answers[1].isCorrect}
                          onAnswer={this.props.answerHandler}>{this.props.question.answers[1].answer}</AnswerButton>
            <AnswerButton isCorrect={this.props.question.answers[2].isCorrect}
                          onAnswer={this.props.answerHandler}>{this.props.question.answers[2].answer}</AnswerButton>
          </div>
        </Container>
      )
    } else if (this.props.question && this.props.question.questionType === 'type2') {
      return (
        <Container pose='stateActive'>
          {this.props.game.currentPerformance.numOfAnsweredQuestions > 0 &&
          <div className='game-stats-container'>{playerPerformance}<span>answers correct</span></div>}
          <div className='answers-container2'>
            <AnswerButton isCorrect={this.props.question.answers[0].isCorrect}
                          onAnswer={this.props.answerHandler}>
              <div>
                <img className='question-img2'
                     src={this.props.question.answers[0].answer}
                     alt='' />
              </div>
            </AnswerButton>
            <AnswerButton isCorrect={this.props.question.answers[1].isCorrect}
                          onAnswer={this.props.answerHandler}>
              <div>
                <img className='question-img2'
                     src={this.props.question.answers[1].answer}
                     alt='' />
              </div>
            </AnswerButton>
            <AnswerButton isCorrect={this.props.question.answers[2].isCorrect}
                          onAnswer={this.props.answerHandler}>
              <div>
                <img className='question-img2'
                     src={this.props.question.answers[2].answer}
                     alt='' />
              </div>
            </AnswerButton>
          </div>
          <div className='question-text2'>Which one
            is <b>{this.props.question.questionText[0].toUpperCase() + this.props.question.questionText.slice(1)}</b>?
          </div>
        </Container>
      )
    } else {
      return <div></div>
    }
  }
}

Question.propTypes = {};

const mapStateToProps = (state) => {
  return {
    game: state.game
  }
}

export default connect(mapStateToProps, {})(Question)