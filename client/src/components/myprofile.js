import React from "react";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Header } from "semantic-ui-react";
import { MDBInput } from "mdbreact";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
    paddingLeft: theme.spacing(8),
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4)
  },
  label: {
    fontFamily: "Arial"
  },
  form: {
    width: "40%"
  }
}));
const style = {
  h1: {
    fontFamily: "Times New Roman",
    fontWeight: "bolder"
  },
  h3: {
    marginTop: "2em",
    padding: "2em 0em"
  }
};
function MyProfile(props) {
  const classes = useStyles();
  const { user } = props;

  return (
    <Paper className={classes.root}>
      <Header
        as="h1"
        content="MY PROFILE"
        style={style.h1}
        textAlign="center"
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <FormControl className={classes.form}>
          <h5>
            <span class="badge badge-primary">Employee Code</span>
          </h5>

          <MDBInput
            disabled
            value={`${user.prefix}${user._id}`}
            name="firstname"
          />

          <h5>
            <span class="badge badge-primary">Name</span>
          </h5>
          <MDBInput disabled value={user.name} name="firstname"></MDBInput>

          <h5>
            <span class="badge badge-primary">Gender</span>
          </h5>
          <MDBInput disabled value={user.gender} name="gender"></MDBInput>

          <h5>
            <span class="badge badge-primary">Designation</span>
          </h5>

          <MDBInput
            disabled
            value={user.designation_id.name}
            name="designation"
          ></MDBInput>

          {user.designation_id.name !== "Admin" ? (
            <>
              <h5>
                <span class="badge badge-primary">Department</span>
              </h5>
              <MDBInput
                disabled
                value={user.department_id.name}
                name="designation"
              ></MDBInput>
              <h5>
                <span class="badge badge-primary">Reporting Manager</span>
              </h5>
              <MDBInput
                disabled
                value={user.reportingManager.name}
                name="reportingmanager"
              ></MDBInput>{" "}
            </>
          ) : null}
        </FormControl>
      </div>
    </Paper>
  );
}

const mapStateToProps = state => {
  return { user: state.auth.user.userdata };
};

export default connect(mapStateToProps)(MyProfile);
