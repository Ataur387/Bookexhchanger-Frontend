import { createStore } from 'redux';

// Define the initial state of the store
const initialState = {
  userToken: null,
  appUserId: null,
};

// Define the reducer function to update the store based on actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_TOKEN':
      return {
        ...state,
        userToken: action.payload,
      };
    case 'SET_APP_USER_ID':
      return {
        ...state,
        appUserId: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store with the initial state and reducer function
const store = createStore(reducer);

export default store;
