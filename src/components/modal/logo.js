import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import "./logo.css";

export default function Logo() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 1000);
  }, []);

  return (
    <div>
      {visible && (
        <div>
          <MainLogo></MainLogo>
          <MnuImg 
            src="/asset/images/MNU_LOGO.jpeg" 
            alt="MNU" 
            width="300" 
          />
        </div>
      )}
    </div>
  );
}

const MainLogo = styled.div`
  z-index: 4;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
`;

const MnuImg = styled.img`
  z-index: 5;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-45%) translateY(-45%);
`;
