import React, { PureComponent } from 'react';
import GoogleLogin from 'react-google-login';
import { LoginAction } from '../actions/LoginAction';
import { connect } from 'react-redux';

class LandingPage extends PureComponent {


  responseGoogle = (response, props) => {
    console.log("yashpal",response)
    if (!response || !response.accessToken) {
      alert("Sorry, failed to login. Try again.");
      return;
    }

    let user = {
      name: response.profileObj.name,
      token: response.Ea
    }


    localStorage.setItem('user', JSON.stringify(user));
    this.props.doLogin();

  }
  render() {
    return (<div >

      <nav className="navbar navbar-light bg-light">
        <a href className="navbar-brand">ToDo App</a>
        <form className="form-inline">
          <GoogleLogin
            clientId="91193785091-fm50j12l1k89pup7rerdtaghq3cmmkbc.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            scope="https://www.googleapis.com/auth/userinfo.email"
          />
        </form>
      </nav>

      <h1>Login First to Craete ToDo App</h1>

    </div>);
  }
}


function mapActionToProps(dispatch) {
  return {
    doLogin: function () {
      dispatch(LoginAction());
    }
  }
}


export default connect(null, mapActionToProps)(LandingPage);