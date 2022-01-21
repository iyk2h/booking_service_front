import Facility from "./components/facility"
import { Link } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Link to="fno/1">족구</Link>
      <Link to="fno/2">풋살</Link>
      <Link to="fno/3">테니스</Link>
      <Link to="fno/4">대운동장</Link>
    </div>
  );
}

export default App;
