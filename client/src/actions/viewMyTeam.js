import { VIEW_MY_TEAM, GET_ERRORS } from "./types";
import Axios from "axios";
import {flush} from './flushRedux';

export const viewMyTeam = skip => dispatch => {
  Axios.get(`/showteam/${skip}`)
    .then(res => {
      dispatch({
        type: VIEW_MY_TEAM,
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
