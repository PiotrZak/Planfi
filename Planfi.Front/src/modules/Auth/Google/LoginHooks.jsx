import React from 'react';
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import { accountService } from 'services/accountServices';
import { routes } from 'routes';
import { useHistory } from 'react-router-dom';

const clientId =
  '732320092646-u673ggg0p7g5ellhhktfbidbutkpig3t.apps.googleusercontent.com';

const clientSecret = "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";

// const refreshTokenSetup = (res) => {
//   let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

//   const refreshToken = async () => {
//     const newAuthRes = await res.reloadAuthResponse();
//     refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
//     localStorage.setItem('authToken', newAuthRes.id_token);
//     setTimeout(refreshToken, refreshTiming);
//   };
//   setTimeout(refreshToken, refreshTiming);
// };

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

    //refreshTokenSetup(res);
  };

  const redirectToPage = (data) => {
    setTimeout(() => {
      history.push(routes.myProfile);
    }, timeToRedirectLogin);
  }

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  // const { signIn } = useGoogleLogin({
  //   onSuccess,
  //   onFailure,
  //   clientId,
  //   isSignedIn: true,
  //   accessType: 'offline',
  //   prompt: 'consent'
  // });

  return (
    <div className="gm-container">
      <GoogleLogin
        clientId={clientId}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
      {/* <img onClick={signIn} src="/icons/library/gmail.svg" alt="google login" className="gm-icon"></img> */}
    </div>
  );
}

export default LoginHooks;