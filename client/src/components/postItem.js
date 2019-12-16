import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";

class PostItem extends Component {
  state = {};
  render() {
    const { author, type, title, description, owner } = this.props;
    return (<><br/>
      <Paper style={{width:"80%", padding:"5px"}}>
        <div style={{ border: "solid 0.1px grey", padding: "5px" }}>
          author:{author}
          <br />
          type:{type}
          <br />
          title:{title}
          <br />
          description:{description}
          <br />
          {owner?<><button>edit</button><button>delete</button></>:""}
        </div>
      </Paper>
      </>
    );
  }
}

export default PostItem;
