import { http } from './http.service'
import { EXERCISES_URL } from './utils'

export const exerciseService = {
  getExercisesByOrganization,
  getExercisesByCategory,
  getExercisesByPlan,
  getAllExercises,
  addExercise,
  editExercise,
  getExerciseById,
  deleteExerciseById,
}

function getAllExercises(body) {
  return http.get(EXERCISES_URL, body)
}

function getExercisesByOrganization(id) {
  return http.get(`${EXERCISES_URL}/organization/${id}`)
}

function getExercisesByCategory(id) {
  return http.get(`${EXERCISES_URL}/category/${id}`)
}

function getExercisesByPlan(id) {
  return http.get(`${EXERCISES_URL}/plan/${id}`)
}

function addExercise(body) {
  return http.postFile(`${EXERCISES_URL}/create`, body)
}

function editExercise(id, body) {
  return http.put(`${EXERCISES_URL}/${id}`, body)
}

function getExerciseById(id) {
  return http.get(`${EXERCISES_URL}/${id}`)
}

function deleteExerciseById(ids) {
  return http.post(`${EXERCISES_URL}/delete`, ids)
}
