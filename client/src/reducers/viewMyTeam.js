import { VIEW_MY_TEAM, CLEAR_TEAM } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case VIEW_MY_TEAM:
      return {
        ...state,
        myteam: action.payload.team,
        teamlen: action.payload.teamlen
      };
    case CLEAR_TEAM:
      return {}
    default:
      return state;
  }
}
