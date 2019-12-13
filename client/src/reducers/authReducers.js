import {
  SET_CURRENT_USER,
  USER_LOADING,
  NOTIFICATION_NUMBER
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case NOTIFICATION_NUMBER:
      return {
        ...state,
        user: {
          ...state.user,
          notificationLength:action.payload
          
        }
      };
    default:
      return state;
  }
}
