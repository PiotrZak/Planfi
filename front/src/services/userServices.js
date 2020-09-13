import { http } from "./http.service";
import { USER_URL } from "./utils"

export const userService = {
    register,
    login,
    allUsers,
    getUserById,
    editUser,
    getUserByRole,
  };

  function register(body) {
    return http.post(`${USER_URL}register`, body);
  }

  function login(body) {
    return http.post(`${USER_URL}authenticate`, body);
  }

  function editUser(id, body) {
    return http.put(`${USER_URL}${id}`, body);
  }

  function getUserById(id) {
    return http.get(`${USER_URL}${id}`);
  }

  function getUserByRole(role) {
    return http.get(`${USER_URL}role/${role}`);
  }

  function allUsers(body) {
    return http.get(USER_URL, body);
  }