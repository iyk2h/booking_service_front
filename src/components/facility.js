import { Outlet } from "react-router-dom";
import Header from "./header";

export default function Facility() {
  return (
    <div>
      <header><Header/></header>
      <main><Outlet /></main>
      <footer>footer입니다.</footer>
    </div>
  );
}