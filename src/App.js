import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "./components/modal/logo";
import "./App.css";

const facilities = [
  {
    fno: 27,
    name: "풋살장",
    place: "공대 근처",
    placeUrl: "www.naver.com",
    maxHour: 2,
  },
  {
    fno: 29,
    name: "테니스장",
    place: "공대 근처",
    placeUrl: "www.naver.com",
    maxHour: 2,
  },
  {
    fno: 34,
    name: "족구장",
    place: "간호대 앞",
    placeUrl: "www.adfsd.com",
    maxHour: 2,
  },
  {
    fno: 36,
    name: "대운동장",
    place: "editTest",
    placeUrl: "editTest",
    maxHour: 3,
  },
];

function App() {
  // const [facilities, setFacilities] = useState(null);

  // useEffect(() => {
  //   getFacilities();
  // }, []);

  // async function getFacilities() {
  //   try {
  //     const response = await axios.get("/");
  //     console.log(response.data);
  //     setFacilities(response.data);
  //   } catch (err) {}
  // }

  if (!facilities) return;
  return (
    <div className="App">
      <Logo />
      {facilities.map((facility) => {
        return (
          <Link key={facility.name} to={`booking/${facility.fno}`}>
            {facility.name}
          </Link>
        );
      })}
    </div>
  );
}

export default App;
