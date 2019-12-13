import { GET_NOTIFICATIONS, CLEAR_NOTIFICATIONS } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      if (action.payload.length === 0) {
        return state;
      } else {
        return { ...state, notifications: action.payload };
      }
    case CLEAR_NOTIFICATIONS:
      return {};
    default:
      return state;
  }
}
