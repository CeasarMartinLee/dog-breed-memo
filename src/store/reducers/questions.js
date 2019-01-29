export default (state = [], action = {}) => {
  return {
    questionType: 'textAnswers || imgAnswers',
    questionImgUrl: 'ulr',
    questionText: 'text',
    answers: [{
      answer: 'string',
      isCorrect: true
    }, {
      answer: 'string',
      isCorrect: false
    }, {
      answer: 'string',
      isCorrect: false
    }],
    breedShownFirstTime: true
  }
}