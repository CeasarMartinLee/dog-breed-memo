import React, { Component } from 'react';
import AnswerButton from './AnswerButton'
import posed from 'react-pose'
import { connect } from 'react-redux'
import ReactLoading from './LoadingScreen'
import Textfit from 'react-textfit'

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

  state = {
    isShowingHint1: false,
    isShowingHint2: false,
    isShowingHint3: false,
    isShowingHint4: false,
    isShowingHint5: false,
    isShowingHint6: false
  }

  playerDidAnswer = (correctly) => {
    console.log('Click reg: Question')
    this.props.answerHandler(correctly)
  }

  showHint = () => {
    console.log(this.props)
    console.log(this.props.question.correctAnswerIs)
    if (this.props.question.answers[0].isCorrect === true) {
      this.setState({
        isShowingHint1: true
      })
    } else if (this.props.question.answers[1].isCorrect === true) {
      this.setState({
        isShowingHint2: true
      })
    } else if (this.props.question.answers[2].isCorrect === true) {
      this.setState({
        isShowingHint3: true
      })
    }
  }

  showHint2 = () => {
    console.log(this.props)
    console.log(this.props.question.correctAnswerIs)
    if (this.props.question.answers[0].isCorrect === true) {
      this.setState({
        isShowingHint4: true
      })
    } else if (this.props.question.answers[1].isCorrect === true) {
      this.setState({
        isShowingHint5: true
      })
    } else if (this.props.question.answers[2].isCorrect === true) {
      this.setState({
        isShowingHint6: true
      })
    }
  }

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
                          onAnswer={this.props.answerHandler}
                          pose={this.state.isShowingHint1 && 'asdf'}>{this.props.question.answers[0].answer}</AnswerButton>
            <AnswerButton isCorrect={this.props.question.answers[1].isCorrect}
                          onAnswer={this.props.answerHandler}
                          pose={this.state.isShowingHint2 && 'asdf'}>{this.props.question.answers[1].answer}</AnswerButton>
            <AnswerButton isCorrect={this.props.question.answers[2].isCorrect}
                          onAnswer={this.props.answerHandler}
                          pose={this.state.isShowingHint3 && 'asdf'}>{this.props.question.answers[2].answer}</AnswerButton>
          </div>
          {this.props.question.breedShownFirstTime &&
          <div className='hint-button' onClick={() => this.showHint()}><h5>?</h5>Need help</div>}
        </Container>
      )
    } else if (this.props.question && this.props.question.questionType === 'type2') {
      return (
        <Container pose='stateActive'>
          <div className='answers-container2'>
            <AnswerButton isCorrect={this.props.question.answers[0].isCorrect}
                          onAnswer={this.props.answerHandler}>
              <div>
                <img className='question-img2'
                     id={this.state.isShowingHint4 && 'type2-hint'}
                     src={this.props.question.answers[0].answer}
                     alt='' />
              </div>
            </AnswerButton>
            <AnswerButton isCorrect={this.props.question.answers[1].isCorrect}
                          onAnswer={this.props.answerHandler}>
              <div>
                <img className='question-img2'
                     id={this.state.isShowingHint5 && 'type2-hint'}
                     src={this.props.question.answers[1].answer}
                     alt='' />
              </div>
            </AnswerButton>
            <AnswerButton isCorrect={this.props.question.answers[2].isCorrect}
                          onAnswer={this.props.answerHandler}>
              <div>
                <img className='question-img2'
                     id={this.state.isShowingHint6 && 'type2-hint'}
                     src={this.props.question.answers[2].answer}
                     alt='' />
              </div>
            </AnswerButton>
          </div>
          <div className='question-text2'>Which one
            is <b>{this.props.question.questionText[0].toUpperCase() + this.props.question.questionText.slice(1)}</b>?
          </div>
          {this.props.question.breedShownFirstTime &&
          <div className='hint-button' onClick={() => this.showHint2()}><h5>?</h5>Need help</div>}
        </Container>
      )
    } else {
      return (<Container pose='stateActive'>
        <div className='main-menu-l1' style={{ color: '#ffffff' }}><Textfit mode='single'
                                                                            forceSingleModeWidth={false}>
          {this.props.showLoading &&
          <ReactLoading type='balls' color={this.props.textColor} className='loadingbar' width='10vw' />}
        </Textfit></div>
        <div className='main-menu-l1' style={{ color: '#ffffff' }}><Textfit mode='single'
                                                                            forceSingleModeWidth={false}>
          <b>...</b>
        </Textfit></div>
        <div className='main-menu-l1' style={{ color: '#ffffff' }}><Textfit mode='single'
                                                                            forceSingleModeWidth={false}>
          One moment please.
        </Textfit></div>
      </Container>)
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