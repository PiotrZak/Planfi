import { http } from "./http.service";
import { PLANS_URL } from "./utils"

export const planService = {
  getAllPlans,
  addPlan,
  getPlanById,
  deletePlanById,
  assignExercises,
  unAssignExercises,
  };

  function getAllPlans(body) {
    return http.get(PLANS_URL, body);
  }

  function addPlan(body) {
    return http.post(`${PLANS_URL}/create`, body);
  }

  function assignExercises(body) {
    return http.post(`${PLANS_URL}/assignExercises`, body);
  }

  function unAssignExercises(body) {
    return http.post(`${PLANS_URL}/unassignExercises`, body);
  }

  function getPlanById(id) {
    return http.get(`${PLANS_URL}/${id}`);
  }

  function deletePlanById(id) {
    return http.del(`${PLANS_URL}/${id}`);
  }
