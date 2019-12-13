import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import componentReducer from "./componentReducer";
import addUser from "./addUser";
import addKra from "./addKra";
import kraRequest from "./kraRequestReducer";
import viewUsers from "./viewUsers";
import viewMyteam from "./viewMyTeam";
import getnotification from './notifications'

export default combineReducers({
  auth: authReducer,
  addUserForm: addUser,
  addKra: addKra,
  showTab: componentReducer,
  kraRequest: kraRequest,
  errors: errorReducer,
  allusers: viewUsers,
  myteam: viewMyteam,
  getnotification:getnotification
});
