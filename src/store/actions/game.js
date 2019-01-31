export const INIT_GAME = 'INIT_GAME'
export const UPDATE_STATS = 'UPDATE_STATS'

export function initGameStats() {
    return {
        type: INIT_GAME,
    }
}

export function updateStats(correct) {
    return{
        type: UPDATE_STATS,
        payload: correct
    }
}
