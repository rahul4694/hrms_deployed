import React, { Component } from "react";
import { connect } from "react-redux";
import { addpost, editpost } from "../actions/blog";
import {setCurrentComponent} from "../actions/componentActions";
import Paper from "@material-ui/core/Paper";
import PostList from './postList'
class CreatePost extends Component {
  state = {
    type: ["Technical", "Attendance/Leave", "Events"],
    title: "",
    describe: "",
    flag: true
  };
  formdataLoaded() {
    if (this.props.formdata && this.state.flag) {
      this.setState({
        selectType: this.props.formdata.type,
        title: this.props.formdata.title,
        describe: this.props.formdata.description,
        flag: false
      });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const obj = {
      title: this.state.title,
      type: this.state.selectType,
      description: this.state.describe
    };
    this.props.edit
      ? this.props.editpost({ ...obj, id: this.props.formdata._id })
      : this.props.addpost(obj);
    this.setState({ title: "", describe: "", selectType: "" });
    this.props.setCurrentComponent(<PostList/>)
  };
  handleForm = val => {
    this.setState({ [Object.keys(val)]: Object.values(val)[0] });
  };
  render() {
    const { errors } = this.props;
    this.formdataLoaded();
    return (
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
          defaultChecked={this.state.selectType}
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
        <button>{this.props.edit ? "Update Post" : "create post"}</button>
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

export default connect(mapStateToProps, { addpost, editpost, setCurrentComponent })(CreatePost);
