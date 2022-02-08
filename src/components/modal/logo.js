import React, { useState } from "react";
import "./logo.css";

export default function Logo() {
  const [visible, setVisible] = useState(true);

  setTimeout(() => {
    setVisible(false);
  }, 1000);
  return (
    <div>
      {visible && (
        <div>
          <div className="MAIN_LOGO"></div>
          <img
            src="/asset/images/MNU_LOGO.jpeg"
            alt="MNU"
            className="mnu_img"
            width="300"
          />
        </div>
      )}
    </div>
  );
}
