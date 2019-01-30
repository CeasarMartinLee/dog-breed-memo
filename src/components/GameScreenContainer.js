import * as React from 'react'
import { connect } from 'react-redux'
import { getImages, getBreedsFromAPI, getImagesFromAPI } from '../store/actions/breeds'
import GameScreen from './GameScreen'
// const breeds = {

//   "affenpinscher": {
//     breedName: "affenpinscher",
//     images: ["URL1", "URL2", "URL3"],
//     hasAlreadyAppeared: false
//   }

//   ,

//   "african": {
//     breedName: "african",
//     images: ["URL1", "URL2", "URL3"],
//     hasAlreadyAppeared: false

//   },

//   "airedale": {
//     breedName: "airedale",
//     images: ["URL1", "URL2", "URL3"],
//     hasAlreadyAppeared: false
//   }
//   ,

//   "akita": {
//     breedName: "akita",
//     images: ["URL1", "URL2", "URL3"],
//     hasAlreadyAppeared: false
//   }
//   ,

//   "beagle": {
//     breedName: "beagle",
//     images: ["URL1", "URL2", "URL3"],
//     hasAlreadyAppeared: false
//   }
//   ,

//   "bluetick": {
//     breedName: "bluetick",
//     images: ["URL1", "URL2", "URL3"],
//     hasAlreadyAppeared: false
//   }
//   ,

//   "boxer": {
//     breedName: "boxer",
//     images: ["URL1", "URL2", "URL3"],
//     hasAlreadyAppeared: false
//   }
//   ,

//   "brabancon": {
//     breedName: "brabancon",
//     images: ["URL1", "URL2", "URL3"],
//     hasAlreadyAppeared: false
//   }
//   ,

//   "briard": {
//     breedName: "briard",
//     images: ["URL1", "URL2", "URL3"],
//     hasAlreadyAppeared: false
//   }
//   ,

//   "bulldog": {
//     breedName: "bulldog",
//     images: ["URL1", "URL2", "URL3"],
//     hasAlreadyAppeared: false
//   }

// }


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



const updateActiveBreeds = (props) => {


}

const handleAnswer = (isCorrect) => {

}

const generateQuestion = (props, currentStreak) => {


    const breedsArray = Object.values(props.breeds.breeds)
    let randomIndex = Math.floor(Math.random() * (breedsArray.length - 3))
    let activeBreeds = breedsArray.slice(randomIndex, randomIndex + 3)

    // let difficultyLevel = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]

    questions.questionType = 'textAnswers'


    if (questions.questionType === 'textAnswers') {
        questions.answers[0].isCorrect = false
        questions.answers[1].isCorrect = false
        questions.answers[2].isCorrect = false
        let j = Math.floor(Math.random() * (questions.answers.length))
        questions.answers[j].isCorrect = true
        questions.questionText = ""
        let shuffledActiveBreeds = activeBreeds
            .map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value)
        questions.answers[0].answer = shuffledActiveBreeds[0]
        questions.answers[1].answer = shuffledActiveBreeds[1]
        questions.answers[2].answer = shuffledActiveBreeds[2]




        // questions.questionImgUrl = props.breeds.breeds[questions.answers[j].answer].images


    }
    console.log(questions, 'questions')
}



class GameScreenContainer extends React.Component {

    componentDidMount() {
        this.props.getBreedsFromAPI()
        console.log(this.props)

    }

    componentDidUpdate() {
        console.log(this.props)

    }

    render() {
        generateQuestion(this.props)

        console.log(this.state, "this state")
        console.log(this.props, "this props")
        console.log(this.props.breeds.breeds, "this props breeds")





        return (
            // <button onClick={generateQuestion}>Press me</button>

            // <GameScreenDetails props={this.props}>         
            <GameScreen props={this.props}>


            </GameScreen>

        )




    }
}

const mapStateToProps = (state) => {
    console.log(state, 'mapStateToProps')
    return {
        breeds: state,
    }
}

export default connect(mapStateToProps, { getImages, getBreedsFromAPI, getImagesFromAPI })(GameScreenContainer)

