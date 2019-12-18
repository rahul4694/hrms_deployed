import React, { useState } from "react";
import { deletepost } from "../actions/blog";
import { setCurrentComponent } from "../actions/componentActions";
import { handlelike, addcomments } from "../actions/blog";
import { connect } from "react-redux";
import Moment from "react-moment";
import EditPost from "./editPost";
import { MDBIcon } from "mdbreact";
import logo from "./bkgrnd.jpg";
import "./index.css";
const PostItem = ({
  blog: { userName, type, title, description, _id, date, likes, comments },
  errors,
  owner,
  skip,
  setCurrentComponent,
  deletepost,
  ownerId,
  handlelike,
  addcomments
}) => {
  const [formdata, setformdata] = useState({
    postid: null,
    like: likes,
    comment: "",
    transparent: likes.indexOf(ownerId) !== -1 ? false : true
  });
  const [show, setshow] = useState(true);
  const { postid, like, comment, transparent } = formdata;
  const likeClick = id => {
    like.indexOf(id) !== -1
      ? setformdata({
          ...formdata,
          like: like.filter(e => e !== id),
          transparent: true
        })
      : setformdata({ ...formdata, like: [...like, id], transparent: false });
  };
  return (
    <>
      <div className="ui card">
        <div className="content">
          <div className="right floated meta">
            <Moment format="DD/MM/YYYY">{date}</Moment>
          </div>
          <img className="ui avatar image" src={logo} /> {title}&nbsp;by
          {userName}
        </div>
        <div className="content">
          <span>{description}</span>
        </div>
        <div className="content">
          <span>
            <MDBIcon
              style={{ color: "lightblue" }}
              far={transparent}
              icon="thumbs-up"
              onClick={e => {
                handlelike(_id);
                likeClick(ownerId);
              }}
            />
            {likes.length}
            &nbsp;<MDBIcon icon="comment-alt" style={{ color: "lightblue" }} />
          {comments.length}
          </span>
          <div className="ui large transparent left icon input form">
            
            <textarea rows="2" type="text" placeholder="Add Comment..."></textarea>
          </div>
          <button>send</button>
        </div>
      </div>

      <div
        className="ui items"
        style={{ border: "solid 0.1px grey", padding: "5px" }}
      >
        <div className="item">
          <img
            className="ui tiny image"
            src={logo}
            alt="no"
            // style={{ width: "25px", borderRadius: "50%" }}
          />
          <h6>{title}</h6>
          {owner && (
            <div style={{ float: "right" }}>
              <MDBIcon
                icon="pencil-alt"
                onClick={e => setCurrentComponent(<EditPost postid={_id} />)}
              />
              <MDBIcon
                icon="trash"
                onClick={e => {
                  deletepost(_id, skip);
                  setformdata({ ...formdata, postid: _id });
                }}
              />
            </div>
          )}
        </div>
        <span style={{ fontSize: "10px" }}>
          by&nbsp;{userName}&nbsp; on&nbsp;
          <Moment format="DD/MM/YYYY">{date}</Moment>
        </span>
        {/* {type} */}
        <br />
        {description}
        <br />
        <input
          hidden={show}
          style={{ width: "100%", borderRadius: "20px" }}
          onChange={e => {
            setformdata({ ...formdata, comment: e.target.value });
          }}
        />
        &nbsp;{like.length}
        &nbsp;
        <MDBIcon icon="comment-alt" style={{ color: "lightblue" }} />
        &nbsp;{comments.length}
        <button
          style={{ borderRadius: "20px" }}
          onClick={e => {
            setshow(!show);
            // addcomments(_id, comment);
          }}
        >
          Add comment
        </button>
        <br />
        {comments[0] && comments[0].msg}
      </div>
      <span style={{ color: "red" }}>
        {errors.error && _id === postid && errors.error.deletemsg}
      </span>
    </>
  );
};
const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};
export default connect(mapStateToProps, {
  handlelike,
  addcomments,
  deletepost,
  setCurrentComponent
})(PostItem);
