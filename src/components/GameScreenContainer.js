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


const handleAnswer = (isCorrect) => {

}


class GameScreenContainer extends React.Component {

    generateQuestion = (props, currentStreak) => {

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


    }

    render() {
        /* this.generateQuestion(this.props) */

        return (
            // <button onClick={generateQuestion}>Press me</button>

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

