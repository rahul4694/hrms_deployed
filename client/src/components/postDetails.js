import React from "react";
import { deletepost } from "../actions/blog";
import { setCurrentComponent } from "../actions/componentActions";
import { handlelike, addcomments } from "../actions/blog";
import { connect } from "react-redux";
import PostItem from "./postItem";
import {} from "../actions/blog";

function PostDetails(props) {
  const blog = props.blog[0];
  return (
    <div>
      {props.blog && (
        <PostItem
          key={blog._id}
          blog={blog}
          ownerId={props.owner_id}
          skip={0}
          owner={props.owner_id === blog.userId ? true : false}
          isfrompostdetails={true}
        />
      )}
    </div>
  );
}
const mapStateToProps = (state, props) => {
  return {
    blog: state.blogs.postlist.filter(p => {
      return p._id === props.postid ? true : false;
    }),
    owner_id: state.auth.user.userdata._id
  };
};
export default connect(mapStateToProps, {
  handlelike,
  addcomments,
  deletepost,
  setCurrentComponent
})(PostDetails);
