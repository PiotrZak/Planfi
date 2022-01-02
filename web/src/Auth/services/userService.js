import { http } from './http.service'
import { USER_URL } from './utils'

export const userService = {
  activate,
  register,
  login,
}

function activate(body) {
  return http.post(`${USER_URL}activate`, body)
}

function register(body) {
  return http.post(`${USER_URL}register`, body)
}

function login(body) {
  return http.post(`${USER_URL}authenticate`, body)
}