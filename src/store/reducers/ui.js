export default (state = {}, action = {}) => {
  switch (action.type) {
    case 'UI_STATE_UPDATE':
      return {
        ...state,
        ...action.payload
      }
    default:
      return {
        backgroundState: 'game',
        wasPreviousAnswerCorrect: null,
        infoScreenBiggerText: '',
        infoScreenSmallerText: '',
        infoScreenTextColor: '#ffffff',
        activeScreen: 'game'
      }
  }
}