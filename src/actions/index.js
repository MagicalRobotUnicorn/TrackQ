import * as actionTypes from './types';

// User Action Types
export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user
    }
  }
}

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER
  }
}

// Asset Action Types
export const setCurrentAsset = asset => {
  return {
    type: actionTypes.SET_CURRENT_ASSET,
    payload: {
      currentAsset: asset
    }
  }
}

export const setPrivateAsset = isPrivateAsset => {
  return {
    type: actionTypes.SET_PRIVATE_ASSET,
    payload: {
      isPrivateAsset
    }
  }
}

// Current Location Payload
export const setCurrentLocation = location => {
  return {
    type: actionTypes.SET_CURRENT_LOCATION,
    payload: {
      currentLocation: location
    }
  }
}