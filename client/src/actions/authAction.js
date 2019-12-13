import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  SET_CURRENT_COMPONENT,
  VIEW_KRA,
  FORMDATA,
  EMPTY_KRA,
  CLEAR_ERRORS,
  CLEAR_NOTIFICATIONS,
  CLEAR_TEAM,
  CLEAR_USERS
} from "./types";

import { setCurrentComponent } from "./componentActions";
import { flush } from "./flushRedux";
import Profile from "../components/myprofile";
import React from "react";
// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/login", userData)
    .then(res => {
      // Set token to localStorage
      const { token, userdata, NotificationNumber } = res.data;

      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data and Set current user
      dispatch(
        setCurrentUser({
          userdata: userdata,
          notificationLength: NotificationNumber
        })
      );

      dispatch(setCurrentComponent(<Profile />));
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Set logged in user
export const setCurrentUser = decoded => dispatch => {
  if (decoded !== null) {
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } else {
    axios
      .get("/getuserdata")
      .then(res => {
        const { userdata, NotificationNumber } = res.data;
        dispatch(
          setCurrentUser({
            userdata: userdata,
            notificationLength: NotificationNumber
          })
        );
        dispatch(setCurrentComponent(<Profile />));
      })
      .catch(err => {
        if (err.response.data.error === "Please authenticate") {
          dispatch(flush());
        }
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => async dispatch => {
  // Remove token from local storage
  axios
    .get("/logout")
    .then(() => {
      // dispatch(flush());
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
    })
    .catch(err => {
      console.log("in logout catch");
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(flush());
    });
};
