import { INIT_GAME, UPDATE_STATS } from '../actions/game';

const initialState = {
  playerName: '',
        currentPerformance: {
          numOfAnsweredQuestions: 0,
          numOfCorrect: 0,
          currentStreak: 0,
          successRate: ''
        },
        difficultyLevel: 0
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_GAME:
      return {
        ...initialState
      }
      case UPDATE_STATS:
      return {
        ...state,
            currentPerformance: {
              ...state.currentPerformance,
                numOfAnsweredQuestions: +1,
                numOfCorrect: + action.payload,
                currentStreak: action.payload ? + 1 : 0
              }
            }
      default:
      return state
  }
}