import { DROPDOWN_DATA, FORMDATA, GET_ERRORS, BASICDETAILS } from "./types";
// import Axios from "axios";
import Axios from "../api/axios"
import { setCurrentComponent } from "./componentActions";
import Alluser from "../components/viewUser";
import React from "react";
import { flush } from "./flushRedux";
import { logoutUser } from "./authAction";
export const getDropdown = () => dispatch => {
  Axios.get("/getseeds")
    .then(res => {
      dispatch({
        type: DROPDOWN_DATA,
        payload: { ...res.data }
      });
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
};
export const basicDetails = formdata => dispatch => {
  dispatch({
    type: BASICDETAILS,
    payload: formdata
  });
};

export const formData = formdata => dispatch => {
  dispatch({
    type: FORMDATA,
    payload: formdata
  });
};

export const saveUser = userdata => async dispatch => {
  Axios.post("/adduser", { userdata })
    .then(val => {
      dispatch({
        type: GET_ERRORS,
        payload: {error:"verification mail has been send to user on desired mail id"}
      });
      dispatch({
        type: FORMDATA,
        payload: null
      });
    })
    .catch(err => {
      if (err.response.data.error === "Please authenticate") {
        dispatch(flush());
      }
      dispatch({
        type: GET_ERRORS,
        payload: {error:err.response.data}
      });
    });
};

export const changePassword = credential => async dispatch => {
  Axios.post("/changepassword", { credential })
    .then(val => {
      dispatch({
        type: GET_ERRORS,
        payload: val.data 
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

