import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Calendar } from './components/calendar';
import Facility from './components/facility';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        {/* 내가 짯는데 내가 이해가 안됨 */}
        <Route path="" element={<Facility />}>
          <Route path=":fno" element={<Calendar />} />
          <Route index element={<div>No result</div>} />
        </Route>
        <Route path="*" element={<div><p>404 Not Found</p></div>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);