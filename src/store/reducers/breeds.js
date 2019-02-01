import { GET_BREEDS, GET_IMAGES, CUT_BREED } from '../actions/breeds';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case GET_BREEDS:
      return {
        ...state,
        all: action.payload
      };
    case GET_IMAGES:
      return {
        ...state,
        active: {
          ...state.active,
          [action.payload.breedName]: {
            ...state.active[action.payload.breedName],
            images: action.payload.imagesArray
          }
        }
      }
    case CUT_BREED:
      delete state.all[action.payload]
      return {
        ...state,
        active: {
          ...state.active,
          [action.payload]: {
            breedName: action.payload,
            images: [],
            hasAlreadyAppeared: false
          }
        }
      }
    case 'UPDATE_BREED_APPEARED':
      return {
        ...state,
        active: {
          ...state.active,
          [action.payload]: {
            ...state.active[action.payload],
            hasAlreadyAppeared: true
          }
        }
      }

    default:
      return state
  }
}