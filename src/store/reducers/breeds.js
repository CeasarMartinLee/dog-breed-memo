import { GET_BREEDS, GET_IMAGES } from '../actions/breeds';

export default (state = [], action = {}) => {
  switch (action.type) {
    case GET_BREEDS:
      return action.payload;
    case GET_IMAGES:
      return {
        ...state,
        [action.payload.breedName]: {
          ...state.breeds[action.payload.breedName],
          images: action.payload.imagesArray
        }
      }
    default:
      return state
  }
}

