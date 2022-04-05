import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// User
import App from "./App";
import Calendar from "./components/booking/calendar";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Facility from "./components/layout/facility";
import Mypage from "./components/mypage/mypage";
import History from "./components/mypage/history";
import Profile from "./components/mypage/profile";
import Password from "./components/mypage/password";
// Admin
import AdminLogin from "./components/Admin/login/AdminLogin";
import AdminMain from "./components/Admin/layout/AdminMain";
import AdminSignUp from "./components/Admin/signup/AdminSignUp";
import AdminBookingContainer from "./components/Admin/booking/AdminBookingContainer";
import AdminFacilityContainer from "./components/Admin/facility/AdminFacilityContainer";
import AdminManageContainer from "./components/Admin/manage/AdminManageContainer";
import AdminMenu from "./components/Admin//layout/AdminMenu";

// context test 중
import { FetchContextProvider } from "./context/fetchContext";

ReactDOM.render(
  <React.StrictMode>
    <FetchContextProvider>
      <BrowserRouter>
        <Routes>
          {/* User */}
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/booking" element={<Facility />}>
            <Route path=":fno" element={<Calendar />} />
            <Route index element={<Navigate replace to="/" />} />
          </Route>
          <Route path="/mypage" element={<Mypage />}>
            <Route path="history" element={<History />} />
            <Route path="profile" element={<Profile />} />
            <Route path="password" element={<Password />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<AdminMain />}>
            <Route path="signup" element={<AdminSignUp />} />
            <Route path="login" element={<AdminLogin />} />
            <Route path="main" element={<AdminMenu />} />
            <Route path="booking" element={<AdminBookingContainer />} />
            <Route path="facility" element={<AdminFacilityContainer />} />
            <Route path="manage" element={<AdminManageContainer />} />
          </Route>
          {/* 404 */}
          <Route
            path="*"
            element={
              <div>
                <p>404 Not Found</p>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </FetchContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
