import { VIEW_KRA, ADD_KRA, GET_ERRORS } from "./types";
import Axios from "axios";
import { setCurrentUser } from "./authAction";
import {flush} from './flushRedux';

// ACTION WHICH SUBMITS USER FILLED KRA TO REDUX
export const addkra = kradata => async dispatch => {
  dispatch({
    type: ADD_KRA,
    payload: kradata
  });
};

// ACTION WHICH SUBMITS USER FILLED KRA TO BACKEND
export const submitkra = kradata => async dispatch => {
  Axios.post("/user/addkra", { kradata })
    .then(() => {
      dispatch(setCurrentUser(null));
    })
    .catch(err => {
      if(err.response.data.error==='Please authenticate'){
        dispatch(flush())
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// ACTION WHICH GETS ALL THE KRA SHEETS OF USER
export const viewkra = year => async dispatch => {
  Axios.get(`/user/viewkra/${year}`)
    .then(res => {
      dispatch({
        type: VIEW_KRA,
        payload: res.data
      });
    })
    .catch(err => {
      if(err.response.data.error==='Please authenticate'){
        dispatch(flush())
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
