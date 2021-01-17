import axios from "axios";

export const http = {
  get,
  post,
  postFile,
  del,
  put
};

const currentUser = JSON.parse((localStorage.getItem('user')));   


const config = {
  headers: { Authorization: `Bearer ${currentUser && currentUser.token}` }
};

console.log(config)

function get(url) {
  return axios.get(url, config).then((response) => {
    return handleResponseError(response);
  });
}

function post(url, body) {
  return axios.post(url, body, config).then((response) => {
    return handleResponseError(response);
  });
}

function postFile(url, body) {
  return axios.post(url, body).then((response) => {
    return handleResponseError(response);
  });
}

function del(url, body) {
  return axios.delete(url, body).then((response) => {
    return handleResponseError(response);
  });
}

function put(url, body) {
  return axios.put(url, body).then((response) => {
    return handleResponseError(response);
  });
}



async function handleResponseError(response) {

  if (response.ok || response.status === 200 || response.status === 201) {
    if (response.status === 204) {
      return response;
    }
    return response.data;
  }

  if (response.status === 409)
    throw ("The data was modified in the meantime. Please refresh the page.");

  if (response.status === 401) {
    throw ("Unathorized");
  }

  if (response.status === 400) {
    let error = await response.json();
    throw error;
  }
}

