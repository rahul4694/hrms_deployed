import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authAction";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import classnames from "classnames";
import logo from "../statics/img/logo.png";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  render() {
    const { errors } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            <Image src={logo} /> Log-in to your account
          </Header>
          <Form className="ui form" size="large" onSubmit={this.onSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="font"
                iconPosition="left"
                placeholder="Employee Code"
                name="email"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email || errors.emailnotfound
                })}
              />
              <span className="red-text">{errors.emailnotfound}</span>
              <Form.Input
                fluid
                icon="lock"
                name="password"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect
                })}
              />
              <span className="red-text">{errors.passwordincorrect}</span>

              <Button color="black" fluid size="large" type="submit">
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { loginUser })(Login);
