import axios from "axios"

const BASE_URL = "http://3.94.44.116:8080"
const headers = { "Content-Type" : "application/json" };

function api(url, data, method, resolve, reject) {
  axios.method(BASE_URL + url, data, headers)
  .then(response => resolve(response))
  .catch(err => reject(err))
}

export { api, BASE_URL }