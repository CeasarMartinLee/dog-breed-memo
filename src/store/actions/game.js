export const INIT_GAME = 'INIT_GAME'
export const UPDATE_STATS = 'UPDATE_STATS'
export const SET_ACTIVE_QUESTION = 'SET_ACTIVE_QUESTION'

export function initGameStats() {
    return {
        type: INIT_GAME,
    }
}

export function updateStats(didPlayerAnswerCorrectly) {
    return{
        type: UPDATE_STATS,
        payload: didPlayerAnswerCorrectly
    }
}

export function setActiveQuestion(question) {
  return {
    type: SET_ACTIVE_QUESTION,
    payload: question
  }
}
