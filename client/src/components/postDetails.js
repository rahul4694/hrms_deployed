import React from "react";
import { setCurrentComponent } from "../actions/componentActions";
import { connect } from "react-redux";
import PostItem from "./postItem";
import PostList from "./postList";

function PostDetails(props) {
  const blog = props.blog[0];
  return (
    <div>
      <button className="ui mini icon button" onClick={e => props.setCurrentComponent(<PostList />)}>
      <i className="left chevron icon"></i>
      </button>
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
  setCurrentComponent
})(PostDetails);
