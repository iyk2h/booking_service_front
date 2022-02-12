import styled from "styled-components";
import { Link } from "react-router-dom";

export default function HomeButton({ url }) {
  return (
    <Link to={url}>
      <HomeImage src="/asset/images/MNU_LOGO.jpeg" alt="MNU"/>
    </Link>
  );
}

const HomeImage = styled.img`
  font-size: 1.8em;
  color: mediumseagreen;
  height: 1.5em;
`;
