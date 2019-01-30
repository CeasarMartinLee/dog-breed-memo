import * as React from 'react'
import { connect } from 'react-redux'
import { getImages, getBreedsFromAPI, getImagesFromAPI } from '../store/actions/breeds'
import GameScreen from './GameScreen'

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

const game = {
    playerName: '',
    currentPerformance: {
        numOfAnsweredQuestions: 0,
        numOfCorrect: 0,
        currentStreak: 0
    },
    difficultyLevel: 0
}

const updateActiveBreeds = (props) => {

}

const handleAnswer = (isCorrect) => {

}


const generateQuestion = (props) => {


    const breedsArray = Object.keys(props.breeds.breeds)

    let randomIndex = Math.floor(Math.random() * (breedsArray.length - 3))
    let activeBreeds = breedsArray.slice(randomIndex, randomIndex + 3)

    questions.questionType = 'textAnswers'


    if (questions.questionType === 'textAnswers' && props.breeds.breeds.length !== 0) {
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
        // let correctAnswer = questions.answers[j].answer
        const imageArray = props.breeds.breeds[questions.answers[j].answer].images
        // if (imageArray.length === 0) {
        //     props.getImagesFromAPI(correctAnswer)
        // }
        const selectedImage = imageArray[Math.floor(Math.random() * imageArray.length)]
        questions.questionImgUrl = selectedImage
        document.getElementById('image').src = questions.questionImgUrl



    }
    console.log(questions, 'questions')
}



class GameScreenContainer extends React.Component {

    componentDidMount() {
        this.props.getBreedsFromAPI()
        console.log(this.props)


    }


    render() {
        if (this.props.breeds.breeds.length !== 0) {
            generateQuestion(this.props)

        }






        return (
            // <button onClick={generateQuestion}>Press me</button>

            // <GameScreenDetails props={this.props}>         
            <GameScreen props={this.props} questions={this.questions}>


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

