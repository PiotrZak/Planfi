import { http } from "./http.service";
import { CATEGORIES_URL } from "./utils"

export const categoryService = {
  getAllCategories,
  addCategory,
  getCategoryById,
  deleteCategories,
  editCategory
  };

  function getAllCategories(body) {
    return http.get(CATEGORIES_URL, body);
  }
  function getOrganizationCategories(id) {
    return http.get(`${CATEGORIES_URL}/organizationscategory/${id}`);
  }
  function addCategory(body) {
    return http.post(`${CATEGORIES_URL}create`, body);
  }
  function getCategoryById(id) {
    return http.get(`${CATEGORIES_URL}${id}`);
  }
  function editCategory(id, body) {
    return http.put(`${CATEGORIES_URL}${id}`, body);
  }
  function deleteCategories(ids) {
    return http.post(`${CATEGORIES_URL}delete`, ids);
  }

  
