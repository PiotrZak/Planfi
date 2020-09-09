import { http } from "./http.service";

export const accountService = {
    uploadAvatar,
  };

// const apiURL = "http://test.eba-hxurpixx.eu-west-1.elasticbeanstalk.com"
const localapiURL = "http://localhost:5005"
const account_URL = `${localapiURL}/Account/`;


  function uploadAvatar(body) {
    return http.post(`${account_URL}uploadAvatar`, body);
  }
