import axios from 'axios'

export default function auth() {
  const url = "/students/check";
  const headers = { "Content-Type" : "application/json" };
  const data = {
    "id": 0,
    "pw": "string"
  }
  axios
  .post(url, data, headers)
  .catch(err => err.response.status === 401 && (window.location.href = "/login"));
}