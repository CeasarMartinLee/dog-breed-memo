import * as React from 'react'
import { connect } from 'react-redux'
import { getImages, getBreedsFromAPI, getImagesFromAPI, cutBreedIntoActive } from '../store/actions/breeds'



// const game = {
//   playerName: '', // needs setter for the player to set it's name
//   currentPerformance: { // needs ONE setter -> input questionAnswered(correctly) ->
//     numOfAnsweredQuestions: 0, // always +1
//     numOfCorrect: 0, // =1 if correct
//     currentStreak: 0 // +1 if correct but = 0 if not
//   },
//   difficultyLevel: 0 // if streak % 10 === 0 && streak !== 0 then +1
// }



const pickRandomElement = (elements) => {
  return elements[Math.floor(Math.random() * elements.length)]
}



class GameScreenContainer extends React.Component {
    state = {
        game: {
            playerName: '', // needs setter for the player to set it's name
            currentPerformance: { // needs ONE setter -> input questionAnswered(correctly) ->
              numOfAnsweredQuestions: 0, // always +1
              numOfCorrect: 0, // =1 if correct
              currentStreak: 0 // +1 if correct but = 0 if not
            },
            difficultyLevel: 0 // if streak % 10 === 0 && streak !== 0 then +1
          }
    }


  updateActiveBreeds = () => {
    // pick randowm three breeds from breeds.all
    const breedsArray = Object.keys(this.props.breeds['all']);
    const threeRandomNames = [];
    for (let i = 0; i < 3; i++) {
      threeRandomNames.push(breedsArray[Math.floor(Math.random() * (breedsArray.length))])
    }
    // cut from all and paste the breeds into active
    threeRandomNames.forEach(breedName => {
      this.props.cutBreedIntoActive(breedName);
    });
    // populate them with images
    threeRandomNames.forEach(breedName => {
      this.props.getImagesFromAPI(breedName);
    });

  }

  generateQuestion = (activeBreeds) => {

    const breeds = Object.keys(activeBreeds)
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
      .slice(0, 3)
      .map((breedName) => activeBreeds[breedName])
  
    const type = Math.random() < 0.25 ? 'type2' : 'type1'
    let answerIndex = Math.floor(Math.random() * 3)

    let questionCounter = this.state.game.currentPerformance.numOfAnsweredQuestions
    this.setState({game: {currentPerformance: {numOfCorrect:  questionCounter++}}}) 

    return {
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
  }

//if selected answer from UI is correct, perform handleAnswer to update Game State
    handleAnswer = (isCorrect) => {
        let correctCounter = this.state.game.currentPerformance.numOfCorrect
            if (isCorrect === true){
                this.setState({game: {currentPerformance: {numOfCorrect:  correctCounter++}}}) 
            }

        let streakCounter = this.state.game.currentPerformance.currentStreak
            if (isCorrect === true){
                this.setState({game: {currentPerformance: {currentStreak:  streakCounter++}}}) 
            } else {
                this.setState({game: {currentPerformance: {currentStreak:  0}}}) 
            }
        
        let levelCounter = this.state.game.difficultyLevel
        if (this.state.game.currentPerformance.currentStreak % 10 === 0 && this.state.game.currentPerformance.currentStreak !== 0){
            this.setState({game: {difficultyLevel: levelCounter++}})  
            this.updateActiveBreeds()
        }
    }

  componentDidMount() {
    this.props.getBreedsFromAPI()
  }

  render() {
    console.log(this.state)
    console.log(this.props)


    return (
      <div props={this.props} questions={this.questions}>
        <button onClick={() => this.updateActiveBreeds()}>check this update acrive breeds</button>
        <button onClick={() => console.log(this.generateQuestion(this.props.breeds.active))}>give me a question</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    breeds: state.breeds
  }
}

export default connect(mapStateToProps, {
  getImages,
  getBreedsFromAPI,
  getImagesFromAPI,
  cutBreedIntoActive
})(GameScreenContainer)
