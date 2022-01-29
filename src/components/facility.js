import { Outlet } from "react-router-dom";
import Header from "./header";

export default function Facility() {
  return (
    <div>
      <header>
        <Header/>
      </header>
      <Outlet />
      <footer>
        footer입니다.
      </footer>
    </div>
  );
}