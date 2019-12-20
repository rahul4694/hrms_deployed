import React, { useState } from "react";
import { deletepost } from "../actions/blog";
import { setCurrentComponent } from "../actions/componentActions";
import { handlelike, addcomments } from "../actions/blog";
import { connect } from "react-redux";
import PostDetails from "./postDetails";
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
  addcomments,
  isfrompostdetails
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
      <div
        className="ui card"
        style={{
          width: "100%",
          fontSize: "10px",
          fontWeight: "lighter",
          fontFamily: "Arial"
        }}
      >
        <div className="content" style={{background:"rgba(0,0,0,0.3)"}}>
          <div className="ui black ribbon label">{userName}</div>
          <div className="right floated meta">
            <Moment format="DD/MM/YYYY">{date}</Moment>
            <MDBIcon
              style={{ color: "lightblue" }}
              far={transparent}
              icon="thumbs-up"
              onClick={e => {
                handlelike(_id);
                likeClick(ownerId);
              }}
            />
            {like.length}
            &nbsp;
            <MDBIcon
              onClick={e => {
                setshow(!show);
              }}
              icon="comment-alt"
              style={{ color: "lightblue" }}
            />
            {comments.length}
            &nbsp;
            {owner && (
              <span>
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
              </span>
            )}
          </div>
          <img className="ui avatar image" src={logo} />
          <span>
            <span style={{ fontSize: "10px", fontWeight: "bold" }}>
              {title}
            </span>
          </span>
        </div>
        <div
          className="content"
          style={{ maxHeight: "200px", overflow: "auto", background:"whitesmoke" }}
        >
          <pre>{description}</pre>
        </div>

        {comments.length > 0 && (
          <>
            {isfrompostdetails ? (
              <div className="ui comments" style={{ padding: "10px" }}>
                <h3 className="ui dividing header"></h3>
                {comments.map((cm, i) => (
                  <div key={i} className="comment">
                    <span className="avatar">
                      <img src={logo} />
                    </span>
                    <div className="content">
                      <span className="author">{cm.userId}</span>
                      <div className="metadata">
                        <span className="date">Yesterday at 12:30AM</span>
                      </div>
                      <div className="text">
                        <pre>{cm.msg}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="comment content"
                onClick={e => setCurrentComponent(<PostDetails postid={_id} />)}
                style={{
                  maxHeight: "100px",
                  overflow: "auto",
                  background: "lightyellow"
                }}
              >
                <span className="avatar">
                  <img src={logo} />
                </span>
                &nbsp;
                <span className="author">{comments[0].userId}</span>&nbsp;
                <span className="date">Yesterday at 12:30AM</span>
                <div className="content">
                  <div className="text">
                    <pre>{comments[0].msg}</pre>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div
          className="ui tiny transparent left icon input form"
          style={{ display: show ? "none" : "block" }}
        >
          <textarea
            onChange={e => {
              setformdata({ ...formdata, comment: e.target.value });
            }}
            rows="5"
            type="text"
            placeholder="Add Comment..."
            style={{
              fontSize: "10px",
              fontWeight: "lighter",
              fontFamily: "Arial"
            }}
          ></textarea>
          <div
            className="ui teal small button right floated"
            onClick={e => addcomments(_id, comment)}
          >
            Add Reply
          </div>
        </div>
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
