import { ALL_BLOGS } from "../actions/types";
const initialstate = {
  loading: true,
  postlist: []
};
export default function(state = initialstate, action) {
  const { type, payload } = action;
  switch (type) {
    case ALL_BLOGS:
      return {
        ...state,
        postlist: payload,
        loading: false
      };
    default:
      return state;
  }
}
