import { GET_NOTIFICATIONS, GET_ERRORS, NOTIFICATION_NUMBER } from "./types";
// import Axios from "axios";
import Axios from "../api/axios"

import { flush } from "./flushRedux";

export const getNotifications = (skip) => dispatch => {
  Axios.get(`/getnotification/${skip}`)
    .then(res => {
      dispatch({
        type: GET_NOTIFICATIONS,
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

export const clickNotification = (id) => dispatch => {
  Axios.get(`/postnotif/${id}`).then((res) => {
    dispatch({
      type: NOTIFICATION_NUMBER,
      payload: res.data.NotificationNumber
    })
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res.data.notification
    });
  }).catch((err) => {
    if (err.response.data.error === "Please authenticate") {
      dispatch(flush());
    }
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  })
}
