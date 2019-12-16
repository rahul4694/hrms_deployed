import React, { Component } from "react";
import { connect } from "react-redux";
import PostItem from "./postItem";
import { addpost, getpost } from "../actions/blog";
import Paper from "@material-ui/core/Paper";

class Posts extends Component {
  state = {
    type: ["Technical", "Attendance/Leave", "Events"],
    title: "",
    describe: "",
    skip: 0
  };
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
          owner={this.props.owner_id === user.userId ? true : false}
        />
      );
    });
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.addpost({
      title: this.state.title,
      type: this.state.selectType,
      description: this.state.describe
    });
    this.setState({ title: "", describe: "", selectType: "" });
  };
  handleForm = val => {
    this.setState({ [Object.keys(val)]: Object.values(val)[0] });
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
          <form onSubmit={this.onSubmit}>
            <input
              placeholder="title"
              required
              value={this.state.title}
              onChange={e => this.handleForm({ title: e.target.value })}
            />
            {errors.title}
            <br />
            <select
              onChange={e => this.handleForm({ selectType: e.target.value })}
            >
              {this.state.type.map(ele => {
                return (
                  <option key={ele} value={ele}>
                    {ele}
                  </option>
                );
              })}
            </select>
            {errors.type}

            <br />
            <br />
            <Paper style={{ width: "80%", padding: "10px" }}>
              <textarea
                value={this.state.describe}
                required
                cols={30}
                rows={5}
                placeholder="description..."
                onChange={e => this.handleForm({ describe: e.target.value })}
              ></textarea>
              {errors.description}
            </Paper>
            <br />
            <button>create post</button>
          </form>
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
