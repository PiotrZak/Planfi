import { http } from "./http.service";
import { CATEGORIES_URL } from "./utils"

export const categoryService = {
  getAllCategories,
  addCategory,
  getCategoryById,
  deleteCategories
  };

  function getAllCategories(body) {
    return http.get(CATEGORIES_URL, body);
  }

  function addCategory(body) {
    return http.post(`${CATEGORIES_URL}create`, body);
  }

  function getCategoryById(id) {
    return http.get(`${CATEGORIES_URL}${id}`);
  }

  function deleteCategories(ids) {
    return http.post(`${CATEGORIES_URL}delete`, ids);
  }

  //todo - edit category endpoint on backend
