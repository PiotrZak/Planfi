import { http } from "./http.service";
import { ACCOUNT_URL } from "./utils"

export const accountService = {
    uploadAvatar,
  };

  function uploadAvatar(body) {
    return http.post(`${ACCOUNT_URL}uploadAvatar`, body);
  }
