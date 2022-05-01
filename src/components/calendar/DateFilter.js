import styled from "styled-components";
import { useDateState, useDateDispatch } from "./dateContext";

function DateFilter() {
  const dateState = useDateState();
  const dateDispatch = useDateDispatch();

  function handleFilter(e) {
    const className = e.target.className;
    if (!className.includes("-btn")) return;
    if (className.includes("prev-btn")) {
      dateDispatch({ type: "PREV" });
    } else if (className.includes("next-btn")) {
      dateDispatch({ type: "NEXT" });
    }
  }

  return (
    <StyFilterContainer onClick={handleFilter}>
      <StyBtn className="prev-btn">&lt;</StyBtn>
      <StyDiv>{`${dateState.viewYear}년 ${dateState.viewMonth}월`}</StyDiv>
      <StyBtn className="next-btn">&gt;</StyBtn>
    </StyFilterContainer>
  );
}

const StyFilterContainer = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
  align-items: center;
  justify-content: center;
  font-size: 17px;
`;

const StyDiv = styled.div`
  width: 100px;
  text-align: center;
`;

const StyBtn = styled.div`
  &:hover {
    cursor: pointer;
  }
  width: match-content;
  height: match-content;
  margin: 0 5px;
  padding: 0 5px;
`;
export default DateFilter;
