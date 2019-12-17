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
    return this.props.blogs.postlist.map(user => {
      return (
        <PostItem
          key={user._id}
          author={user.userName}
          type={user.type}
          title={user.title}
          description={user.description}
          id={user._id}
          skip={this.state.skip}
          owner={this.props.owner_id === user.userId ? true : false}
        />
      );
    });
  };

  render() {
    const { loading, postlist } = this.props.blogs;
    const { errors } = this.props;
    if (loading) {
      return <div>loading</div>;
    }
    return (
      <Paper style={{ width: "80%", padding: "10px" }}>
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
      </Paper>
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
