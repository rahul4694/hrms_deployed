import React from "react";
import { connect } from "react-redux";
import CreatePost from './createPost'
import { editpost } from "../actions/blog";

function Editpost(props) {
  return <div>
      <CreatePost formdata={props.post[0]} edit={true}/>
  </div>;
}
const mapStateToProps = (state, props) => {
  return {
    post: state.blogs.postlist.filter(p => {
      return p._id === props.postid ? true : false;
    })
  };
};
export default connect(mapStateToProps, { editpost })(Editpost);
