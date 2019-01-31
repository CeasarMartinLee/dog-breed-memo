import * as React from 'react'
import { connect } from 'react-redux'
import { getImages, getBreedsFromAPI, getImagesFromAPI, cutBreedIntoActive } from '../store/actions/breeds'
import { updateUIState } from '../store/actions/ui'
import AppRootScreen from './AppRootScreen'

const pickRandomElement = (elements) => {
  return elements[Math.floor(Math.random() * elements.length)]
}

class GameScreenContainer extends React.Component {


  state = {}
  updateActiveBreeds = () => {

    const breedsArray = Object.keys(this.props.breeds['all']);
    const threeRandomNames = [];
    for (let i = 0; i < 3; i++) {
      threeRandomNames.push(breedsArray[Math.floor(Math.random() * (breedsArray.length))])
    }

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

    if ((this.props.uiState.game.currentPerformance.currentStreak % 10 === 0) && (this.props.uiState.currentPerformance.currentStreak !== 0)) {
      this.updateActiveBreeds()
    }

    this.setState(
      {
        game: {
          ...this.props.uiState.game,
          currentPerformance: {
            ...this.props.uiState.game.currentPerformance,
            numOfAnsweredQuestions: this.props.uiState.game.currentPerformance.numOfCorrect + 1,
            numOfCorrect: this.props.uiState.game.currentPerformance.numOfCorrect + correct,
            currentStreak: correct ? this.props.uiState.game.currentPerformance.currentStreak + 1 : 0
          }
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

    const type = 'type1' // Math.random() < 0.25 ? 'type2' :
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
        breedShownFirstTime: !breeds[answerIndex].hasAlreadyAppeared
      }
    })
  }

  handleAnswer = (isCorrect) => {

  }

  componentDidMount() {
    this.props.getBreedsFromAPI()
    setTimeout(() => this.updateActiveBreeds(), 2000)
    setTimeout(() => this.generateQuestion(), 5000)
  }

  render() {
    if (!('activeQuestion' in this.state)) {
      return (
        <div>A</div>
      )
    } else {
      return (<AppRootScreen activeQuestion={this.state.activeQuestion} answerHandler={this.handleAnswer} />)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    breeds: state.breeds,
    uiState: state.ui
  }
}

export default connect(mapStateToProps, {
  getImages,
  getBreedsFromAPI,
  getImagesFromAPI,
  cutBreedIntoActive,
  updateUIState
})(GameScreenContainer)
