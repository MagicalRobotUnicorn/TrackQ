import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialUserState = {
  currentUser: null,
  isLoading: true
};

const user_reducer = (state = initialUserState, action) => {
  switch(action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false
      }
      case actionTypes.CLEAR_USER:
        return {
          ...initialUserState,
          isLoading: false
        }
    default:
      return state;
  }
}

const initialAssetState = {
  currentAsset: null
};

// Initial location State
const initialLocationState = {
  currentLocation: null
}

const asset_reducer = (state = initialAssetState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_ASSET:
      return {
        ...state,
        currentAsset: action.payload.currentAsset
      }
    case actionTypes.SET_PRIVATE_ASSET:
      return {
        ...state,
        isPrivateAsset: action.payload.isPrivateAsset
      }
    default:
      return state;
  }
}

// Location Reducer function
const location_reducer = (state = initialLocationState, action) => {
  switch(action.type) {
    case actionTypes.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload.currentLocation
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user: user_reducer,
  asset: asset_reducer,
  location: location_reducer
});

export default rootReducer;