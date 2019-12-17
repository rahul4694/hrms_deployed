import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { deletepost } from "../actions/blog";
import { setCurrentComponent } from "../actions/componentActions";
import { connect } from "react-redux";
import EditPost from "./editPost";

class PostItem extends Component {
  state = { postid: null };
  render() {
    const { author, type, title, description, owner, id } = this.props;
    return (
      <>
        <br />
        <Paper style={{ width: "80%", padding: "5px" }}>
          <div style={{ border: "solid 0.1px grey", padding: "5px" }}>
            author:{author}
            <br />
            type:{type}
            <br />
            title:{title}
            <br />
            description:{description}
            <br />
            {owner && (
              <>
                <button
                  onClick={e =>
                    this.props.setCurrentComponent(<EditPost postid={id} />)
                  }
                >
                  edit
                </button>
                <button
                  onClick={e => {
                    this.props.deletepost(id, this.props.skip);
                    this.setState({ postid: id });
                  }}
                >
                  delete
                </button>
              </>
            )}
          </div>
          <span style={{ color: "red" }}>
            {this.props.errors.error &&
              id === this.state.postid &&
              this.props.errors.error.deletemsg}
          </span>
        </Paper>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    errors: state.errors
  };
};
export default connect(mapStateToProps, { deletepost, setCurrentComponent })(
  PostItem
);
