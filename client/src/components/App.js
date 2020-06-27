import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { LoginAction } from '../actions/LoginAction';
import LandingPage from './landingPage';
import MainPage from './MainPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import ListDetails from './ListDetails';
class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    return (
      <Router>
        <div>
          {this.props.loggedIn ? <Redirect to={{ pathname: "/MainPage" }} />
            : <Redirect to={{ pathname: "/MainPage" }} />}
        </div>

        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/MainPage">
            <MainPage />
          </Route>
          <Route path="/LandingPage">
            <LandingPage />
          </Route>
          <Route path="/details">
            <ListDetails />
          </Route>
        </Switch>
      </Router>

    )
  }
}

function mapStateToProps(state) {
  return { loggedIn: state.LoginReducer.loggedIn };
}

function mapActionToProps(dispatch) {
  return {
    doLogin: function () {
      dispatch(LoginAction());
    }
  }
}


export default connect(mapStateToProps, mapActionToProps)(App);