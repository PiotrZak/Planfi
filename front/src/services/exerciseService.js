import { http } from "./http.service";

export const exerciseService = {
  getAllExercises,
  addExercise,
  getExerciseById,
  deleteExerciseById
  };

// const apiURL = "http://test.eba-hxurpixx.eu-west-1.elasticbeanstalk.com"
const localapiURL = "http://localhost:5005"

const EXERCISES_URL = `${localapiURL}/Exercises`;

  function getAllExercises(body) {
    return http.get(EXERCISES_URL, body);
  }

  function addExercise(body) {
    return http.postFile(`${EXERCISES_URL}/create`, body);
  }

  function getExerciseById(id) {
    return http.get(`${EXERCISES_URL}/${id}`);
  }

  function deleteExerciseById(id) {
    return http.del(`${EXERCISES_URL}/${id}`);
  }
