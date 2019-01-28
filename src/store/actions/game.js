export const SET_PLAYER = 'SET_PLAYER'
export const QUESTION_ANSWERED = 'QUESTION_ANSWERED'


export function setPlayerName(playerName) {
    return {
        type: SET_PLAYER,
        payload: playerName
    }
}

export function questionAnswered(correct) {
    return {
        type: QUESTION_ANSWERED,
        payload: correct
    }
}