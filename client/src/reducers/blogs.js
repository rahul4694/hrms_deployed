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
    case "EDIT_POST":
      let index=null
      const newarr=state.postlist.filter((p, i)=>{
        return p._id===payload._id?index=i:p
      })
      newarr.splice(index, 1, payload)
      return {
        ...state,
        loading: false,
        postlist: newarr
      };
    default:
      return state;
  }
}
