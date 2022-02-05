import axios from 'axios'

export default function auth() {
  const url = "/students/check";
  const data = {
    "id": 0,
    "pw": "string"
  }
  axios
  .post(url, data)
  .catch(err => err.response.status === 401 && routeToLogin());
}

function logout() {
  axios.get("/students/logout")
  .then(response => {
    if(response.status === 200) {
      alert("로그아웃 되었습니다.");
      routeToLogin();
    }
  })
}

function routeToLogin() {
  return window.location.href = "/login";
}

export { logout };