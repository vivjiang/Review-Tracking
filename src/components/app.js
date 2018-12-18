import React, { Component } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
// import Google from './google';
import Dashboard from './Dashboard';
import '../style.scss';

const YOUR_CLIENT_ID = '38722714684-55v0i5qrm0sgual3kt15gcog4chgiubk.apps.googleusercontent.com';
// const YOUR_REDIRECT_URI = 'http://localhost:8080';

class App extends Component {
  constructor() {
    super();
    this.state = { isAuthenticated: false };
  }

    logout = () => {
      this.setState({ isAuthenticated: false });
    };

    onFailure = (error) => {
      console.log(error);
    };


    async googleResponse(response) {
      // const options = {
      //   method: 'POST',
      //   body: response,
      //   mode: 'cors',
      //   cache: 'default',
      // };
      console.log(response);
      // const { accessToken } = response;
      // const { refreshToken } = response;
      // console.log(accessToken);
      // console.log(refreshToken);
      const { code } = response;

      const result = await axios.post('http://localhost:9090/google/auth', { code })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log('result', result);
    }


    render() {
      const { isAuthenticated } = this.state;
      // const { user } = this.state;
      const content = isAuthenticated
        ? (
          <div>
            <p>Authenticated</p>
          </div>
        )
        : (
          <div>
            <GoogleLogin
              clientId={YOUR_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.googleResponse}
              onFailure={this.onFailure}
              responseType="code"
              prompt="consent"
            />
          </div>
        );

      return (
        <div className="App">
          {content}
          <Dashboard />
        </div>
      );
    }
}

export default App;
