import { VIEW_USERS, GET_ERRORS } from "./types";
import Axios from "axios";
import { flush } from "./flushRedux";

export const viewUsers = skip => dispatch => {
  Axios.get(`/showemployees/${skip}`)
    .then(res => {
      dispatch({
        type: VIEW_USERS,
        payload: res.data
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
