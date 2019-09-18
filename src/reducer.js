import { ADD_USER, GET_FEEDS } from './actions/types';

const initialState = {
  userInfo: null,
  feeds: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        userInfo: action.payload
      }
    case GET_FEEDS:
      return {
        ...state,
        feeds: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;