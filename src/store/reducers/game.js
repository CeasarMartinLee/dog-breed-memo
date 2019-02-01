import { INIT_GAME, SET_ACTIVE_QUESTION, UPDATE_STATS } from '../actions/game';

const initialState = {
  playerName: '',
  currentPerformance: {
    numOfAnsweredQuestions: 0,
    numOfCorrect: 0,
    currentStreak: 0,
    successRate: ''
  },
  difficultyLevel: 0,
  activeQuestion: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case INIT_GAME:
      return {
        ...initialState
      }
    case SET_ACTIVE_QUESTION:
      return {
        ...state,
        activeQuestion: action.payload
      }
    case UPDATE_STATS:
      return {
        ...state,
        currentPerformance: {
          ...state.currentPerformance,
          numOfAnsweredQuestions: action.payload.currentPerformance.numOfAnsweredQuestions,
          numOfCorrect: action.payload.currentPerformance.numOfCorrect,
          currentStreak: action.payload.currentPerformance.currentStreak
        }
      }
    default:
      return state
  }
}

