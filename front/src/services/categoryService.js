import { http } from "./http.service";

export const categoryService = {
  getAllCategories,
  addCategory,
  getCategoryById,
  deleteCategoryById
  };

// const apiURL = "http://test.eba-hxurpixx.eu-west-1.elasticbeanstalk.com"
const localapiURL = "http://localhost:5005"

const CATEGORIES_URL = `${localapiURL}/Category`;

  function getAllCategories(body) {
    return http.get(CATEGORIES_URL, body);
  }

  function addCategory(body) {
    return http.post(`${CATEGORIES_URL}/create`, body);
  }

  function getCategoryById(id) {
    return http.get(`${CATEGORIES_URL}/${id}`);
  }

  function deleteCategoryById(id) {
    return http.del(`${CATEGORIES_URL}/${id}`);
  }
