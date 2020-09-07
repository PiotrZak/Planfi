import { http } from "./http.service";

export const planService = {
  getAllPlans,
  addPlan,
  getPlanById,
  deletePlanById,
  assignExercises
  };

// const apiURL = "http://test.eba-hxurpixx.eu-west-1.elasticbeanstalk.com"
const localapiURL = "http://localhost:5005"

const CATEGORIES_URL = `${localapiURL}/Plans`;

  function getAllPlans(body) {
    return http.get(CATEGORIES_URL, body);
  }

  function addPlan(body) {
    return http.post(`${CATEGORIES_URL}/create`, body);
  }

  function assignExercises(body) {
    return http.post(`${CATEGORIES_URL}/assignExercises`, body);
  }

  function getPlanById(id) {
    return http.get(`${CATEGORIES_URL}/${id}`);
  }

  function deletePlanById(id) {
    return http.del(`${CATEGORIES_URL}/${id}`);
  }
