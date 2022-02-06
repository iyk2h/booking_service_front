import { useState, useEffect } from "react";
import axios from "axios";

export default function useLoginStatus() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    axios
    .get("/check")
    .then((response) => response.status === 200 && setIsLogin(true))
    .catch((err) => err.response.status === 401 && console.log("Login Err" + err));
  }, []);
  return isLogin;
}
