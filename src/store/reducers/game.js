import { INIT_GAME, UPDATE_STATS, SET_ACTIVE_QUESTION } from '../actions/game';

const initialState = {
  playerName: '',
  currentPerformance: {
    numOfAnsweredQuestions: 0,
    numOfCorrect: 0,
    currentStreak: 0,
    successRate: ''
  },
  difficultyLevel: 0,
  activeQuestion: {},
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
          numOfAnsweredQuestions: state.currentPerformance.numOfAnsweredQuestions + 1,
          numOfCorrect: (state.currentPerformance.numOfCorrect + Number(action.payload)),
          currentStreak: action.payload ? (state.currentPerformance.currentStreak + 1) : 0
        }
      }
    default:
      return state
  }
}

