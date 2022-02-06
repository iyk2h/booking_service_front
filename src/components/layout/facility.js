import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

export default function Facility() {
  return (
    <div className="content_wrap">
      <header><Header/></header>
      <main><Outlet /></main>
      <footer><Footer /></footer>
    </div>
  );
}