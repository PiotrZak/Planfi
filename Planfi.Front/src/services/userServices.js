import { http } from "./http.service";
import { USER_URL } from "./utils"

export const userService = {
    activate,
    register,
    login,
    allUsers,

    allClients,
    allTrainers,
    allClientsByTrainer,
    allTrainersByClient,
    
    getUserById,
    editUser,
    getUserByRole,
    deleteUsers,

    assignUsersToTrainer,
    unAssignUsersToTrainer,
    assignPlanToUser,
    unAssignPlanToUser,
  };

  function activate(body){
    return http.post(`${USER_URL}activate`, body);
  }

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

  function allUsers() {
    return http.get(`${USER_URL}users`);
  }

  function allClients() {
    return http.get(`${USER_URL}clients`);
  }

  function allTrainers() {
    return http.get(`${USER_URL}trainers`);
  }

  function allClientsByTrainer(id) {
    return http.get(`${USER_URL}trainerClients`);
  }

  function allTrainersByClient(id) {
    return http.get(`${USER_URL}clientTrainers/${id}`);
  }
  function deleteUsers(body) {
    return http.post(`${USER_URL}delete`, body);
  }

  function assignUsersToTrainer(body) {
    return http.post(`${USER_URL}assignUsers`, body);
  }

  function unAssignUsersToTrainer(body) {
    return http.post(`${USER_URL}unassignUsers`);
  }

  function assignPlanToUser(body) {
    return http.post(`${USER_URL}assignPlans`, body);
  }

  function unAssignPlanToUser(body) {
    return http.post(`${USER_URL}unAssignUsers`, body);
  }



