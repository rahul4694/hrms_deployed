import { ALL_BLOGS, GET_ERRORS } from "./types";
import Axios from "../api/axios";
import { flush } from "./flushRedux";

export const addpost = formdata => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  Axios.post("/addpost", formdata, config)
    .then(res => {
      dispatch({
        type: ALL_BLOGS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response.data);
      const errors = err.response.data.errors;
      let newerr = {};
      errors.forEach((er, i) => {
        newerr[er.param] = er.msg;
      });
      dispatch({
        type: GET_ERRORS,
        payload: newerr
      });
    });
};

export const getpost = skip => async dispatch => {
  Axios.get(`/getpost/${skip}`)
    .then(res => {
      dispatch({
        type: ALL_BLOGS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: { error: err.response.data }
      });
    });
};

export const deletepost = id => async dispatch => {
  Axios.get(`/deletepost/${id}`).then(res => {
    dispatch({
      type: ALL_BLOGS,
      payload: res.data
    });
  });
};
