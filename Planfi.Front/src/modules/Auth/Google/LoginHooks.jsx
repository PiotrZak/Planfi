import React from 'react';
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import { accountService } from 'services/accountServices';
import { routes } from 'routes';
import { useHistory } from 'react-router-dom';

const clientId =
  '732320092646-u673ggg0p7g5ellhhktfbidbutkpig3t.apps.googleusercontent.com';

const clientSecret = "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";

const timeToRedirectLogin = 1000;

const LoginHooks = () => {

  const history = useHistory();
  console.log('test')
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);

    const inviteModel = {
      organizationId: 'O1',
      email: res.profileObj.email,
      role: 'User'
    };

    accountService.gmailSignUp(inviteModel)
      .then((data) => {
        redirectToPage(data);
        localStorage.removeItem('user');
        delete data.token;
        localStorage.setItem('user', JSON.stringify(data));
        console.log(data)

      })
      .catch((error) => {
        console.log(error)
      });

  };

  const redirectToPage = (data) => {
    setTimeout(() => {
      history.push(routes.myProfile);
    }, timeToRedirectLogin);
  }

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  return (
    <div className="gm-container">
      <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default LoginHooks;