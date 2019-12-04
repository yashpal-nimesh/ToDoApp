import React, { PureComponent } from 'react';
import GoogleLogin from 'react-google-login';
import { LoginAction } from '../actions/LoginAction';
import { connect } from 'react-redux';

class LandingPage extends PureComponent {
    state = {  }

    componentDidMount(){
      console.log("LandingPage Mount")
          }
          componentWillMount(){
              console.log("LandingPage Unmount")
      
          }

    responseGoogle = (response,props) => {
      console.log(response);
      if(!response || !response.accessToken) {
          alert("Sorry, failed to login. Try again.");
          return;
      }
      console.log(response)
    
      let user = {
          name: response.profileObj.name,
          token: response.El
      }
    
      localStorage.setItem('user', JSON.stringify(user));
      this.props.doLogin();
    
    }
    render() { 
        return ( <div >

<nav className="navbar navbar-light bg-light">
  <a className="navbar-brand">ToDo App</a>
  <form className="form-inline">
  <GoogleLogin
    clientId="886252175319-pmhq5uqg4nu7l0v28g21g3387knl6ned.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
    scope="https://www.googleapis.com/auth/userinfo.email"
/>
  </form>
</nav>
          
          <h1>Login First to Craete ToDo App</h1>

        </div> );
    }
}


function mapActionToProps(dispatch) {
  return {
      doLogin: function() {
          dispatch(LoginAction());
      }
  }
}


export default connect(null,mapActionToProps)(LandingPage);