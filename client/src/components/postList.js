import React, { Component } from "react";
import { connect } from "react-redux";
import PostItem from "./postItem";
import CreatePost from "./createPost";
import { addpost, getpost } from "../actions/blog";
import Paper from "@material-ui/core/Paper";

class Posts extends Component {
  state = { skip: 0 };
  componentDidMount() {
    this.props.getpost(0);
  }

  renderlist = () => {
    return this.props.blogs.postlist.map(blog => {
      return (
        <PostItem
          key={blog._id}
          blog={blog}
          ownerId={this.props.owner_id}
          skip={this.state.skip}
          owner={this.props.owner_id === blog.userId ? true : false}
        />
      );
    });
  };

  render() {
    const { loading, postlist } = this.props.blogs;
    if (loading) {
      return <div>loading</div>;
    }
    return (
        <div style={{ width: "100%" }}>
          <CreatePost />
          <button
            disabled={this.state.skip === 0 ? true : false}
            onClick={e => {
              this.setState({ skip: this.state.skip - 10 });
              this.props.getpost(this.state.skip - 10);
            }}
          >
            prev
          </button>
          <button
            disabled={postlist < 10 ? true : false}
            onClick={e => {
              this.setState({ skip: this.state.skip + 10 });
              this.props.getpost(this.state.skip + 10);
            }}
          >
            next
          </button>
          <br />
          {this.renderlist()}
        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    owner_id: state.auth.user.userdata._id,
    errors: state.errors
  };
};
export default connect(mapStateToProps, { addpost, getpost })(Posts);
