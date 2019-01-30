import request from 'superagent';

export const ADD_BREED = 'ADD_BREED'
export const IMG_DISPLAYED = 'IMG_DISPLAYED'
export const GET_BREEDS = 'GET_BREEDS'
export const GET_IMAGES = 'GET_IMAGES'
export const CUT_BREED = 'CUT_BREED'

export function getBreedsFromAPI() {
  return dispatch => {
    request('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        return Object.keys(response.body.message).reduce((acc, curr) => {
          acc[curr] = {
            breedName: curr,
            images: [],
            hasAlreadyAppeared: false
          }
          return acc;
        }, {});
      })
      .then(response => {
        dispatch({
          type: GET_BREEDS,
          payload: response
        })
      })
  }
}


export function cutBreedIntoActive(breedName) {
  return {
    type: CUT_BREED,
    payload: breedName
  }
}

export function getImages(payload) {
  return {
    type: GET_IMAGES,
    payload
  }
}

export function getImagesFromAPI(breedName) {
  return function (dispatch) {
    request(`https://dog.ceo/api/breed/${breedName}/images`)
      .then(response => {
        const imagesArray = response.body.message;
        const actionObject = {
          breedName,
          imagesArray
        }
        dispatch(getImages(actionObject))
      })
  }
}