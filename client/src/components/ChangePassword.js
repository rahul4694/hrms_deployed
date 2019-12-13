import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Button } from "@material-ui/core";
import { changePassword } from "../actions/adduser";
import { connect } from "react-redux";
import { setCurrentComponent } from "../actions/componentActions";
import { getThemeProps } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: 200
  }
}));

function ChangePassword(props) {
  console.log(props);
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: "",
    newpassword: "",
    oldpassword: "",
    weight: "",
    weightRange: "",
    showPassword: false
  });
  const [email, setEmail] = React.useState(props.email);

  const [credentials, setCredentials] = React.useState(null);
  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleClickShowOldPassword = () => {
    setValues({ ...values, showoldPassword: !values.showoldPassword });
  };

  const handleClickShowNewPassword = () => {
    setValues({ ...values, shownewPassword: !values.shownewPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <Paper className={classes.root} style={{padding:"10px"}}>
      <div>
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Old Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-oldpassword"
            type={values.showoldPassword ? "text" : "password"}
            value={values.oldpassword}
            name="oldpassword"
            onChange={event => handleChange(event)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowOldPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showoldPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={100}
          />
        </FormControl>
        <br />
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            New Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-newpassword"
            type={values.shownewPassword ? "text" : "password"}
            value={values.newpassword}
            name="newpassword"
            onChange={event => handleChange(event)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.shownewPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={100}
          />
        </FormControl>
        <br />
        {props.error}
        <br />
        <Button
          type="submit"
          variant="contained"
          color="default"
          onClick={() => {
            props.changePassword({
              email: email,
              newpassword: values.newpassword,
              oldpassword: values.oldpassword
            });
          }}
        >
          Submit
        </Button>
        </div>
    </Paper>
  );
}

const mapStateToProps = state => ({
  email: state.auth.user.userdata.email,
  error: state.errors.error
});
export default connect(mapStateToProps, {
  setCurrentComponent,
  changePassword
})(ChangePassword);
