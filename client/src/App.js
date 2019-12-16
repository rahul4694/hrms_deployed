import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { setCurrentUser } from "./actions/authAction";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/login";
import PrivateRoute from "./components/private-route/privateroute";
import Dashboard from "./components/dashboard/dashboard";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  store.dispatch(setCurrentUser(null));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Login} />
              <PrivateRoute
                exact
                path="/dashboard"
                name="rahul"
                component={Dashboard}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
