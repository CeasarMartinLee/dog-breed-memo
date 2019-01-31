import * as React from 'react'
import { connect } from 'react-redux'
import { getImages, getBreedsFromAPI, getImagesFromAPI, cutBreedIntoActive } from '../store/actions/breeds'
import { initGameStats, updateStats } from '../store/actions/game'
import AppRootScreen from './AppRootScreen'

const pickRandomElement = (elements) => {
  return elements[Math.floor(Math.random() * elements.length)]
}

class GameScreenContainer extends React.Component {

  /* state = {
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
  } */

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
// this action replaces setState(), needs whatever correct is and passes as a action.payload
    this.props.updateStats(correct);
    if ((this.props.game.currentPerformance.currentStreak % 10 === 0) && (this.props.game.currentPerformance.currentStreak !== 0)) {
      this.updateActiveBreeds()
    }
    /* this.setState(
      {
        game: {
          ...this.state.game,
          currentPerformance: {
            ...this.state.game.currentPerformance,
            numOfAnsweredQuestions: this.state.game.currentPerformance.numOfCorrect + 1,
            numOfCorrect: this.state.game.currentPerformance.numOfCorrect + correct,
            currentStreak: correct ? this.state.game.currentPerformance.currentStreak + 1 : 0
          }
        }
      })
  } */
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
    // need to activate game stats --> initiats game stats in redux
    this.props.initGameStats()

    setTimeout(() => this.updateActiveBreeds(), 2000)
    setTimeout(() => this.generateQuestion(), 5000)
  }

  render() {
    console.log(this.state.activeQuestion)

    return (
      <AppRootScreen activeQuestion={this.state.activeQuestion} answerHandler={this.handleAnswer} />
    )
  }
}


const mapStateToProps = (state) => {
  return {
    breeds: state.breeds,
    game: state.game
  }
}

export default connect(mapStateToProps, {
  getImages,
  getBreedsFromAPI,
  getImagesFromAPI,
  cutBreedIntoActive,
  initGameStats,
  updateStats
})(GameScreenContainer)
