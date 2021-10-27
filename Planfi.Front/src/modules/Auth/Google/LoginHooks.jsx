import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { accountService } from 'services/accountServices';

const clientId =
  '330292086297-rocc6he3rn68thtoddg4m202h64haqhl.apps.googleusercontent.com';

  const refreshTokenSetup = (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
  
    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
      localStorage.setItem('authToken', newAuthRes.id_token);
      setTimeout(refreshToken, refreshTiming);
    };

    setTimeout(refreshToken, refreshTiming);
  };

function LoginHooks() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    const emails = [];
    emails.push(res.profileObj.email);

    const inviteModel = {
        organizationId: 'O1',
        emails,
        role: 'User'
      };

    accountService.gmailSignUp(inviteModel)
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      });

    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.`
    );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} className="button">
      <img src="icons/google.svg" alt="google login" className="icon"></img>

      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}

export default LoginHooks;