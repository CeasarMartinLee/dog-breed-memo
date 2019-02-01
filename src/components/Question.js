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

  state = {
    isShowingHint1: false,
    isShowingHint2: false,
    isShowingHint3: false,
    isShowingHint4: false,
    isShowingHint5: false,
    isShowingHint6: false,
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
    console.log(this.props)
    console.log(this)
//feature - implement type2 question; changed const type to type2
// if (this.props.question) { //original code
    if (this.props.question && this.props.question.questionType === 'type1') {
      return (
        <Container pose='stateActive' className='question-container'>
          <div className='img-container-box'>
            <img className='question-img'
                 src={this.props.question.questionImgUrl}
                 alt='' />
          </div>
          <div className='question-text'>What breed is the dog on the picture?
            <button className='hint-button' onClick={() => this.showHint()}>HINT</button>
          </div>

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
        </Container>
      )
    } else if (this.props.question && this.props.question.questionType === 'type2') {
      return (
        <Container pose='stateActive'>
        {/* <Container pose='stateActive' className='question-container'> */}
          <div className='answers-container2'>
            <AnswerButton isCorrect={this.props.question.answers[0].isCorrect}
                          onAnswer={this.props.answerHandler}>
                                    <div >
                                      <img  className='question-img2'
                                            id={this.state.isShowingHint4 && 'type2-hint'}                                            
                                            src={this.props.question.answers[0].answer}
                                            alt='' />
                                    </div>                          
            </AnswerButton>
            <AnswerButton isCorrect={this.props.question.answers[1].isCorrect}
                          onAnswer={this.props.answerHandler}>
                                     <div >
                                      <img  className='question-img2'
                                            id={this.state.isShowingHint5 && 'type2-hint'}                                            
                                            src={this.props.question.answers[1].answer}
                                            alt='' />
                                     </div>                                                             
            </AnswerButton>
            <AnswerButton isCorrect={this.props.question.answers[2].isCorrect}
                          onAnswer={this.props.answerHandler}>
                                     <div >
                                      <img  className='question-img2'
                                            id={this.state.isShowingHint6 && 'type2-hint'}
                                            src={this.props.question.answers[2].answer}
                                            alt='' />
                                     </div>                                                    
            </AnswerButton>
          </div>
          <div className='question-text2'>Find <b>{this.props.question.questionText}</b> in the pictures
            <button className='hint-button' onClick={() => this.showHint2()}>HINT</button>
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