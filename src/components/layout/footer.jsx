import styled from "styled-components";

const surveyLink = "https://naver.me/FIp9ILfg";

export default function Footer() {
  return (
    <Wrap>
      <div style={{opacity: 0.4, fontSize: "12px"}}>© 목대컴공</div>
      <SurveyLink />
    </Wrap>
  );
}

function SurveyLink() {
  return (
      <StLink href={surveyLink} target="_blank" rel="noreferrer">
        &gt; 피드백을 남겨주세요
      </StLink>
  );
}

const Wrap = styled.div`
  position: fixed;
  bottom: 0;
  padding: 1em;

  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StLink = styled.a`
  font-size: 8px;
  font-weight: normal;
  text-decoration: underline;
  text-underline-position: under;
  &hover {
    font-weight: bold;
  }
`;
