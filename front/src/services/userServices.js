import { http } from "./http.service";

export const userService = {
    register,
    login,
    allUsers,
    getUserById,
  };

// const apiURL = "http://test.eba-hxurpixx.eu-west-1.elasticbeanstalk.com"
const localapiURL = "http://localhost:5005"
const USER_URL = `${localapiURL}/Users/`;


  function register(body) {
    return http.post(`${USER_URL}register`, body);
  }

  function login(body) {
    return http.post(`${USER_URL}authenticate`, body);
  }

  function getUserById(id) {
    return http.get(`${USER_URL}${id}`);
  }

  function allUsers(body) {
    return http.get(USER_URL, body);
  }