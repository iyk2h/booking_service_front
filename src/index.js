import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Calendar } from './components/calendar';
import { Login } from "./components/login";
import Facility from './components/facility';
import Check from "./components/check";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/check" element={<Check />} />
        <Route path="/booking" element={<Facility />}>
          <Route path=":fno" element={<Calendar />} />
          <Route index element={<Navigate replace to="/"/>} />
        </Route>
        <Route path="*" element={<div><p>404 Not Found</p></div>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);