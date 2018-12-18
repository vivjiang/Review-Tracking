import axios from 'axios';

const YOUR_CLIENT_ID = '38722714684-55v0i5qrm0sgual3kt15gcog4chgiubk.apps.googleusercontent.com';
const YOUR_REDIRECT_URI = 'http://localhost:8080';
const OAUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

const googleAuth = () => {
  const headers = {
    client_id: YOUR_CLIENT_ID,
    redirect_uri: YOUR_REDIRECT_URI,
    scope: 'https://www.googleapis.com/auth/plus.business.manage',
    include_granted_scopes: 'true',
    response_type: 'token',
    'Access-Control-Allow-Origin': '*',
  };

  return new Promise((resolve, reject) => {
    axios.get(OAUTH_URL, { headers })
      .then((response) => {
        resolve(response.data.items);
      })
      .catch((error) => {
        console.log(`youtube api error: ${error}`);
        reject(error);
      });
  });
};
  // Add form parameters as hidden input values.
export default googleAuth;
