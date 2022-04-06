import { useState } from "react";

export default function AccountButton() {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);
  return <i className="fas fa-user-circle" onClick={handleClick}></i>;
}
