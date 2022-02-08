import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './components/modal/logo';
import "./App.css"

function App() {
  return (
    <div className="App">
      <Logo />
      <Link to="booking/1">족구</Link>
      <Link to="booking/2">풋살</Link>
      <Link to="booking/3">테니스</Link>
      <Link to="booking/4">대운동장</Link>
    </div>
  );
}

export default App;
