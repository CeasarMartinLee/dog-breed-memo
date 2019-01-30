import * as React from 'react'
import { connect } from 'react-redux'
import { getImages, getBreedsFromAPI, getImagesFromAPI, cutBreedIntoActive } from '../store/actions/breeds'
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

class GameScreenContainer extends React.Component {

    generateQuestion = (props, currentStreak) => {

    const breedsArray = Object.keys(props.breeds.breeds)

    let randomIndex = Math.floor(Math.random() * (breedsArray.length - 3))
    let activeBreeds = breedsArray.slice(randomIndex, randomIndex + 3)
        const breedsArray = Object.values(props.breeds.breeds)
        let randomIndex = Math.floor(Math.random() * (breedsArray.length - 3))
        let activeBreeds = breedsArray.slice(randomIndex, randomIndex + 3)

    questions.questionType = 'textAnswers'
        // let difficultyLevel = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]

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

    componentDidMount() {
        this.props.getBreedsFromAPI()

    }

    componentDidUpdate() {



    render() {
        if (this.props.breeds.breeds.length !== 0) {
            generateQuestion(this.props)

        }






        return (
            // <button onClick={generateQuestion}>Press me</button>

            // <GameScreenDetails props={this.props}>         
            <GameScreen props={this.props} questions={this.questions}>
            // <GameScreenDetails props={this.props}>
            <div>
                <GameScreen props={this.props}>

                </GameScreen>
                <button onClick={() => this.updateActiveBreeds()}>check this update acrive breeds</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        breeds: state.breeds
    }
}

export default connect(mapStateToProps, { getImages, getBreedsFromAPI, getImagesFromAPI, cutBreedIntoActive })(GameScreenContainer)

