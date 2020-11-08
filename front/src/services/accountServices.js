import { http } from "./http.service";
import { ACCOUNT_URL } from "./utils"

export const accountService = {
    uploadAvatar,
    sendInvitation,
    forgotPassword,
    resetPassword,
  };

  function uploadAvatar(body) {
    return http.post(`${ACCOUNT_URL}uploadAvatar`, body);
  }

  function sendInvitation(body) {
    return http.post(`${ACCOUNT_URL}activate`, body);
  }

  function forgotPassword(body) {
    return http.post(`${ACCOUNT_URL}forgot-password`, body);
  }

  function resetPassword(body) {
    return http.post(`${ACCOUNT_URL}reset-password`, body);
  }

