import * as React from 'react'
import { connect } from 'react-redux'
import { cutBreedIntoActive, getBreedsFromAPI, getImages, getImagesFromAPI } from '../store/actions/breeds'
import { initGameStats, setActiveQuestion, updateStats } from '../store/actions/game'
import { updateUIState } from '../store/actions/ui'
import AppRootScreen from './AppRootScreen'

const pickRandomElement = (elements) => {
  return elements[Math.floor(Math.random() * elements.length)]
}

class GameScreenContainer extends React.Component {

  state = {
    game: {
      playerName: '',
      currentPerformance: {
        numOfAnsweredQuestions: 0,
        numOfCorrect: 0,
        currentStreak: 0,
        successRate: ''
      },
      difficultyLevel: 0
    }
  }

  updateActiveBreeds = () => {

    const breedsArray = Object.keys(this.props.breeds['all']);

    const threeRandomNames = Object.keys(this.props.breeds.all)
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
      .slice(0, 3)

    threeRandomNames.forEach(breedName => {
      this.props.cutBreedIntoActive(breedName);
    });

    threeRandomNames.forEach(breedName => {
      this.props.getImagesFromAPI(breedName);
    });

  }

  nextQuestion = (previousWasCorrect) => {
    this.updateGameScreenContainerStats(previousWasCorrect)
    this.generateQuestion()
  }

  updateGameScreenContainerStats = (correct) => {

    if ((this.props.game.currentPerformance.currentStreak % 10 === 0) && (this.props.game.currentPerformance.currentStreak !== 0)) {
      this.updateActiveBreeds()
    }

    console.log('AAA', this.props.game, correct, Number(correct), (this.props.game.currentPerformance.numOfCorrect + Number(correct)))
    this.props.updateStats(
      {
        ...this.props.game,
        currentPerformance: {
          ...this.props.game.currentPerformance,
          numOfAnsweredQuestions: (this.props.game.currentPerformance.numOfAnsweredQuestions + 1),
          numOfCorrect: (this.props.game.currentPerformance.numOfCorrect + Number(correct)),
          currentStreak: (correct ? this.props.game.currentPerformance.currentStreak + 1 : 0)
        }
      })
  }

  generateQuestion = () => {

    const activeBreeds = this.props.breeds.active

    const breeds = Object.keys(activeBreeds)
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
      .slice(0, 3)
      .map((breedName) => activeBreeds[breedName])

    const type = Math.random() < 0.25 ? 'type2' : 'type1'
    let answerIndex = Math.floor(Math.random() * 3)

    this.setState({
      activeQuestion: {
        questionType: type,
        questionImgUrl: type === 'type1' ? pickRandomElement(breeds[answerIndex].images) : '',
        questionText: type === 'type2' ? breeds[answerIndex].breedName : '',
        answers: [{
          answer: type === 'type1' ? breeds[0].breedName : pickRandomElement(breeds[0].images),
          isCorrect: answerIndex === 0
        }, {
          answer: type === 'type1' ? breeds[1].breedName : pickRandomElement(breeds[1].images),
          isCorrect: answerIndex === 1
        }, {
          answer: type === 'type1' ? breeds[2].breedName : pickRandomElement(breeds[2].images),
          isCorrect: answerIndex === 2
        }],
        breedShownFirstTime: !breeds[answerIndex].hasAlreadyAppeared,
        correctAnswerIs: type === 'type1' ? breeds[answerIndex].breedName : (answerIndex + 1).toString()
      }
    })
  }

  handleAnswer = (isCorrect) => {
    this.updateGameScreenContainerStats(isCorrect)
  }

  componentDidMount() {
    this.props.getBreedsFromAPI()
    // need to activate game stats --> initiats game stats in redux
    this.props.initGameStats()

    setTimeout(() => this.updateActiveBreeds(), 2000)
    setTimeout(() => this.generateQuestion(), 5000)
  }

  render() {
    console.log(this.props.game.activeQuestion)

    return (
      //  <AppRootScreen activeQuestion={this.props.game.activeQuestion} answerHandler={this.handleAnswer}/>
      //  bug-investigate nextQuestion- updated above line
      <AppRootScreen activeQuestion={this.state.activeQuestion} answerHandler={this.handleAnswer}
                     generateQuestion={this.generateQuestion} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    breeds: state.breeds,
    game: state.game,
    uiState: state.ui
  }
}

export default connect(mapStateToProps, {
  getImages,
  getBreedsFromAPI,
  getImagesFromAPI,
  cutBreedIntoActive,
  initGameStats,
  updateStats,
  updateUIState,
  setActiveQuestion
})(GameScreenContainer)

