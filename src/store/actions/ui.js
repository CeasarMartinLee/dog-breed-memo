export function updateUIState(parameters) {
  return {
    type: 'UI_STATE_UPDATE',
    payload: parameters
  }
}