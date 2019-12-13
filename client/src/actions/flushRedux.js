import {
  SET_CURRENT_COMPONENT,
  VIEW_KRA,
  FORMDATA,
  EMPTY_KRA,
  CLEAR_ERRORS,
  CLEAR_NOTIFICATIONS,
  CLEAR_TEAM,
  CLEAR_USERS
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import {setCurrentUser} from './authAction';

export const flush = () =>dispatch=> {
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch({
    type: SET_CURRENT_COMPONENT,
    payload: null
  });
  dispatch({
    type: FORMDATA,
    payload: null
  });
  dispatch({
    type: VIEW_KRA,
    payload: null
  });
  dispatch({
    type: EMPTY_KRA
  });
  dispatch({
    type: CLEAR_ERRORS
  });
  dispatch({
    type: CLEAR_NOTIFICATIONS
  });
  dispatch({
    type: CLEAR_TEAM
  });
  dispatch({
    type: CLEAR_USERS
  });
  dispatch(setCurrentUser({}));
};
