import React, { Component } from "react";
import { connect } from "react-redux";
import PostItem from "./postItem";
import CreatePost from "./createPost";
import { addpost, getpost } from "../actions/blog";

class Posts extends Component {
  state = {
    skip: 0,
    type: ["Technical", "Attendance/Leave", "Events"],
    selectedType: "Technical"
  };
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
        <div className="three ui buttons">
          {this.state.type.map(ele => {
            return (
              <button
                className="ui button"
                key={ele}
                value={ele}
                onClick={e => this.setState({ selectedType: e.target.value })}
              >
                {ele}
              </button>
            );
          })}
        </div>
        <CreatePost selectedType={this.state.selectedType} />
        <div className="ui buttons">
          <button
            className="ui mini icon button"
            disabled={this.state.skip === 0 ? true : false}
            onClick={e => {
              this.setState({ skip: this.state.skip - 10 });
              this.props.getpost(this.state.skip - 10);
            }}
          >
            <i className="left chevron icon"></i>
          </button>
          <button
            className="ui mini right floated icon button"
            disabled={postlist < 10 ? true : false}
            onClick={e => {
              this.setState({ skip: this.state.skip + 10 });
              this.props.getpost(this.state.skip + 10);
            }}
          >
            <i className="right chevron icon"></i>
          </button>
        </div>
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
