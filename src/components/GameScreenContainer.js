import * as React from 'react'
import { connect } from 'react-redux'
import { getImages, getBreedsFromAPI, getImagesFromAPI } from '../store/actions/breeds'

const breeds = {

  "affenpinscher": {
    breedName: "affenpinscher",
    images: ["URL1", "URL2", "URL3"],
    hasAlreadyAppeared: false
  }

  ,

  "african": {
    breedName: "african",
    images: ["URL1", "URL2", "URL3"],
    hasAlreadyAppeared: false

  },

  "airedale": {
    breedName: "airedale",
    images: ["URL1", "URL2", "URL3"],
    hasAlreadyAppeared: false
  }
  ,

  "akita": {
    breedName: "akita",
    images: ["URL1", "URL2", "URL3"],
    hasAlreadyAppeared: false
  }
  ,

  "beagle": {
    breedName: "beagle",
    images: ["URL1", "URL2", "URL3"],
    hasAlreadyAppeared: false
  }
  ,

  "bluetick": {
    breedName: "bluetick",
    images: ["URL1", "URL2", "URL3"],
    hasAlreadyAppeared: false
  }
  ,

  "boxer": {
    breedName: "boxer",
    images: ["URL1", "URL2", "URL3"],
    hasAlreadyAppeared: false
  }
  ,

  "brabancon": {
    breedName: "brabancon",
    images: ["URL1", "URL2", "URL3"],
    hasAlreadyAppeared: false
  }
  ,

  "briard": {
    breedName: "briard",
    images: ["URL1", "URL2", "URL3"],
    hasAlreadyAppeared: false
  }
  ,

  "bulldog": {
    breedName: "bulldog",
    images: ["URL1", "URL2", "URL3"],
    hasAlreadyAppeared: false
  }

}

const questions = {
  questionType: 'textAnswers || imgAnswers',
  questionImgUrl: 'ulr',
  questionText: 'text',
  answers: [{
    answer: 'string',
    isCorrect: false
  }, {
    answer: 'string',
    isCorrect: false
  }, {
    answer: 'string',
    isCorrect: false
  }],
  breedShownFirstTime: true
}

const updateActiveBreeds = () => {




}

const handleAnswer = (isCorrect) => {

}


const generateQuestion = () => {

  // decide on type

  let difficultyLevel = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]

  questions.questionType = 'textAnswers'



  const breedsArray = Object.values(breeds)
  let randomIndex = Math.floor(Math.random() * (breedsArray.length - 3))
  if (questions.questionType === 'textAnswers') {
    questions.questionText = ""
    const possibleAnswers = breedsArray.slice(randomIndex, randomIndex + difficultyLevel[0])
    let i = 0
    for (i === 0; i < questions.answers.length; i++) {
      questions.answers[i].answer = possibleAnswers[i].breedName
    }
    let j = Math.floor(Math.random() * (questions.answers.length - 1))
    questions.answers[j].isCorrect = true

    questions.questionImgUrl = breeds[questions.answers[j].answer].images

  }
}

class GameScreenContainer extends React.Component {

  render() {

    this.props.getBreedsFromAPI()



    return <button onClick={generateQuestion}>Press me</button>

  }
}

export default connect(null, { getImages, getBreedsFromAPI, getImagesFromAPI })(GameScreenContainer)

