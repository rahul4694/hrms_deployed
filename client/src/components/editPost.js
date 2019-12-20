import React from "react";
import { connect } from "react-redux";
import CreatePost from "./createPost";
import { editpost } from "../actions/blog";

function Editpost(props) {
  const formdata = props.post[0];
  return (
    <div>
      <CreatePost
        formdata={formdata}
        selectedType={formdata.type}
        edit={true}
      />
    </div>
  );
}
const mapStateToProps = (state, props) => {
  return {
    post: state.blogs.postlist.filter(p => {
      return p._id === props.postid ? true : false;
    })
  };
};
export default connect(mapStateToProps, { editpost })(Editpost);
