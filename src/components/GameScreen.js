import React from 'react';
import PropTypes from 'prop-types';
import './GameScreen.css'
import { getImagesFromAPI } from '../store/actions/breeds'
import { connect } from 'react-redux'



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

const generateQuestion = (props) => {
  console.log(props)
  
  
  const breedsArray = Object.keys(props.props.breeds.breeds)

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
      // let correctAnswer = questions.answers[j].answer
      document.getElementById('option1').innerHTML = questions.answers[0].answer
      document.getElementById('option2').innerHTML = questions.answers[1].answer
      document.getElementById('option3').innerHTML = questions.answers[2].answer
      let correctAnswer = questions.answers[j].answer
      // getImagesFromAPI("african")
      const imageArray = props.props.breeds.breeds[questions.answers[j].answer].images
      if (imageArray.length === 0){
        props.getImagesFromAPI(correctAnswer)
      }
      const selectedImage = imageArray[Math.floor(Math.random() * imageArray.length)]
      questions.questionImgUrl = selectedImage
      document.getElementById('image').src = questions.questionImgUrl


      console.log(questions.questionImgUrl)

  }
  console.log(questions, 'questions')

}

const GameScreen = (props) => {


if (props.props.breeds.breeds.length !== 0){
  generateQuestion(props)

}



  return (
    <div className='gameScreen'>
      <div className='game-area'>
        <div className='img-container-box'>
          <img className='question-img' id='image' src='https://3c1703fe8d.site.internapcdn.net/newman/csz/news/800/2018/2-dog.jpg'
               alt='' />
        </div>
        <div className='question-text'>What breed is the dog on the picture?</div>
        <div className='answers-container'>
          <div className='option' id='option1'>Alpaca</div>
          <div className='option' id='option2'>Humaracha</div>
          <div className='option' id='option3'>Bullodogo</div>
        </div>
      </div>
    </div>
    
  );
};

GameScreen.propTypes = {};

export default connect(null, { getImagesFromAPI })(GameScreen)

// export default GameScreen;