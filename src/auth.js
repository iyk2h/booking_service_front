import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useLoginStatus() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    axios
    .get("/check")
    .then((response) => response.status === 200 && setIsLogin(true))
    .catch((err) => err.response.status === 401 && navigate("/login"));
  }, []);
  return isLogin;
}
