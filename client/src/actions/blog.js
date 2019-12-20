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

export const getpost = (postType, skip) => async dispatch => {
  console.log(postType, skip, 'fkdsa');
  
  Axios.get(`/getpost/${postType}/${skip}`)
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

export const deletepost = (id, skip) => async dispatch => {
  Axios.get(`/deletepost/${id}/${skip}`)
    .then(res => {
      dispatch({
        type: ALL_BLOGS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: { error: err.response.data }
      });
    });
};

export const editpost = formdata => async dispatch => {
  Axios.post(`/editpost`, formdata)
    .then(res => {
      dispatch({
        type: "EDIT_POST",
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: { error: err.response.data }
      });
    });
};

export const handlelike = id => async dispatch => {
  Axios.post(`/handlelike/${id}`)
    .then(res => {
      dispatch({
        type:"HANDLE_LIKE",
        payload:{postid:id, likes:res.data }
      })
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: { error: err.response.data }
      });
    });
};

export const addcomments = (id, comment) => async dispatch => {
  Axios.post(`/addcomment/${id}`, { comment })
    .then(res => {
      dispatch({
        type:"ADD_COMMENT",
        payload:{postid:id, comments:res.data }
      })
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: { error: err.response.data }
      });
    });
};
