export default (state = {}, action = {}) => {
  return {
    playerName: 'Albert',
    currentPerformance: {
      numOfAnsweredQuestions: 0,
      numOfCorrect: 0
    },
    difficultyLevel: 0,
  }
}