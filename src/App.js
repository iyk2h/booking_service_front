import React from "react";
import { Link } from "react-router-dom";
import Logo from "./components/modal/logo";
import "./App.css";

const facilities = [
  {
    place: "족구장",
    url: "booking/1",
  },
  {
    place: "풋살",
    url: "booking/2",
  },
  {
    place: "테니스",
    url: "booking/3",
  },
  {
    place: "대운동장",
    url: "booking/4",
  },
];

function App() {
  return (
    <div className="App">
      <Logo />
      {facilities.map((facility) => {
        return (
          <Link key={facility.place} to={facility.url}>
            {facility.place}
          </Link>
        );
      })}
    </div>
  );
}

export default App;
