export const ADD_BREED = 'ADD_BREED'
export const IMG_DISPLAYED = 'IMG_DISPLAYED'

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

export function imageHasBeenDisplayed(breedName, imageUrl) {
  return {
    type: IMG_DISPLAYED,
    payload: {
      breedToUpdate: breedName,
      imageToRemove: imageUrl
    }
  }
}
