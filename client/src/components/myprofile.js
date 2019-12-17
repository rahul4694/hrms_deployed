import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";

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
      <Grid container>
        <Grid item xs={11}>
          <TextField
            id="firstName"
            name="firstName"
            label="Employee Code"
            fullWidth
            readOnly
            value={`${user.prefix}${user._id}`}
          />
        </Grid>
        <br /> <br /> <br /> <br />
        <Grid item xs={11}>
          <TextField
            id="lastName"
            name="lastName"
            label="First name"
            fullWidth
            readOnly
            value={user.name}
          />
        </Grid>
        <br /> <br /> <br /> <br />
        <Grid item xs={11}>
          <TextField
            id="address1"
            name="address1"
            label="Gender"
            fullWidth
            readOnly
            value={user.gender}
          />
        </Grid>
        <br /> <br /> <br /> <br />
        <Grid item xs={11}>
          <TextField
            id="address2"
            name="address2"
            label="Designation"
            fullWidth
            readOnly
            value={user.designation_id.name}
          />
          <br /> <br />
        </Grid>
        {user.designation_id.name !== "Admin" ? (
          <>
            <Grid item xs={11}>
              <TextField
                id="city"
                name="city"
                label="Department"
                fullWidth
                readOnly
                value={user.department_id.name}
              />
            </Grid>
            <br /> <br /> <br /> <br />
            <Grid item xs={11}>
              <TextField
                id="zip"
                name="zip"
                label="Reporting Manager"
                fullWidth
                readOnly
                value={user.reportingManager.name}
              />
            </Grid>
          </>
        ) : null}
      </Grid>
    </Paper>
  );
}
const mapStateToProps = state => {
  return { user: state.auth.user.userdata };
};

export default connect(mapStateToProps)(MyProfile);
