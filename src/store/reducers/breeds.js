import { GET_BREEDS, GET_IMAGES } from '../actions/breeds';

export default (state = [], action = {}) => {
  switch (action.type) {
    case GET_BREEDS:
      //this added
      return {
        ...state,
        breedsAll: action.payload
      };
    case GET_IMAGES:
    // this added
      return {
        ...state,
        breedsAll: {
          ...state.breedsAll,
          [action.payload.breedName]: {
            ...state.breedsAll[action.payload.breedName],
            images: action.payload.imagesArray
          }
        }
      }
    default:
      return state
  }
}