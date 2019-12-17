import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { deletepost } from "../actions/blog";
import { setCurrentComponent } from "../actions/componentActions";
import { connect } from "react-redux";
import EditPost from "./editPost";
import { MDBIcon } from "mdbreact";

class PostItem extends Component {
  state = { postid: null };
  render() {
    const {
      userName,
      type,
      title,
      description,
      _id,
      date,
      likes
    } = this.props.blog;
    const { owner } = this.props;
    return (
      <>
        <br />
          <div style={{ border: "solid 0.1px grey", padding: "5px" }}>
            <h5>{title}</h5>
            <MDBIcon icon="user-circle" />
            {userName}&nbsp;
            {date}
            <br />
            {type}
            <br />
            {description}
            <br />
            <MDBIcon far icon="thumbs-up" />
            &nbsp;{likes.length}
            <br />
            <input />
            <br />
            {owner && (
              <>
                <button
                  onClick={e =>
                    this.props.setCurrentComponent(<EditPost postid={_id} />)
                  }
                >
                  edit
                </button>
                <button
                  onClick={e => {
                    this.props.deletepost(_id, this.props.skip);
                    this.setState({ postid: _id });
                  }}
                >
                  delete
                </button>
              </>
            )}
          </div>
          <span style={{ color: "red" }}>
            {this.props.errors.error &&
              _id === this.state.postid &&
              this.props.errors.error.deletemsg}
          </span>
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
