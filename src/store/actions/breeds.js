import request from 'superagent';
import { createSecureContext } from 'tls';

export const ADD_BREED = 'ADD_BREED'
export const IMG_DISPLAYED = 'IMG_DISPLAYED'
export const GET_BREEDS = 'GET_BREEDS'
export const GET_IMAGES = 'GET_IMAGES'

export function getBreeds() {
  request('https://dog.ceo/api/breeds/list/all')
    .then(response => {
      const breeds = Object.keys(response.body.message).reduce((acc, curr) => {
        acc[curr] = {
          breedName: curr,
          images: [],
          hasAlreadyAppeared: false
        }
        return acc;
      }, {});
      return {
        type: GET_BREEDS,
        payload: {
          breeds
        }
      }

    })

}


export function addBreed(breedName, imageUrls) {
  return {
    type: ADD_BREED,
    payload: {
      [breedName]: {
        breedName: breedName,
        images: [...imageUrls],
        hasAlreadyAppeared: false
      }
    }
  }
}


export function getImages(breedName) {
  request(`https://dog.ceo/api/breed/${breedName}/images`)
    .then(response => {
      const imagesArray = response.body.message;
      console.log(imagesArray);
      return {
        type: GET_IMAGES,
        payload: {
          breedName, imagesArray
        }
      }
    })
}

export function imageHasBeenDisplayed(breedName, imageUrl) {
  return {
    type: IMG_DISPLAYED,
    payload: {
      breedToUpdate: breedName,
      imageToRemove: imageUrl
    }
  }
}
