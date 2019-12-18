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
      case "ADD_COMMENT":
        return {
          ...state,
          loading:false,
          postlist:state.postlist.map((post)=>{
            if(post._id===payload.postid){
              post.comments=payload.comments
            }
            return post
          })
        }
      case "HANDLE_LIKE":
        return {
          ...state,
          loading:false,
          postlist:state.postlist.map((post)=>{
            if(post._id===payload.postid){
              post.likes=payload.likes
            }
            return post
          })
        }
    default:
      return state;
  }
}
