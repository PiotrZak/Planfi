import axios from 'axios'
import Cookies from 'js-cookie'

export const http = {
  get,
  post,
  postFile,
  del,
  put,
}

function get(url) {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get('JWT')}` },
  }

  return axios.get(url, config).then((response) => {
    return handleResponseError(response)
  })
}

function post(url, body) {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get('JWT')}` },
  }

  return axios
    .post(url, body, config)
    .then((response) => {
      return handleResponseError(response)
    })
    .catch((err) => {
      throw err.response
    })
}

function postFile(url, body) {
  return axios.post(url, body).then((response) => {
    return handleResponseError(response)
  })
}

function del(url, body) {
  return axios.delete(url, body).then((response) => {
    return handleResponseError(response)
  })
}

function put(url, body) {
  return axios.put(url, body).then((response) => {
    return handleResponseError(response)
  })
}

async function handleResponseError(response) {
  if (
    response.ok ||
    response.status === 200 ||
    response.status === 201 ||
    response.status === 400
  ) {
    if (response.status === 204) {
      return response
    }
    return response.data
  }
  if (response.status === 409) {
    let error = await response
    // eslint-disable-next-line
    throw 'The data was modified in the meantime. Please refsresh the page.' + error;
  }
  if (response.status === 401) {
    let error = await response
    // eslint-disable-next-line
    throw 'Unathorized' + error;
  }

  if (response.status === 400) {
    let error = await response
    throw error
  }
}
