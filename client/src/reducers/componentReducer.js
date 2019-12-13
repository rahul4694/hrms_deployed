import setAuthToken from "../utils/setAuthToken";
const initialState = {
  comp: null
};
export default function(state = initialState, action) {
  if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);

    switch (action.type) {
      case "SET_CURRENT_COMPONENT":
        return {
          ...state,
          comp: action.payload
        };
      default:
        return state;
    }
  } else {
    setAuthToken(null);
    return initialState;
  }
}
