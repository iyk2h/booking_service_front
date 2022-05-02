import styled from "styled-components";
import { useDateState, useDateDispatch } from "../../context/dateContext";

function DateFilter() {
  const dateState = useDateState();
  const dateDispatch = useDateDispatch();

  return (
    <StyFilterContainer>
      <StyBtn onClick={() => dateDispatch({ type: "PREV" })}>&lt;</StyBtn>
      <StyDiv>{`${dateState.viewYear}년 ${dateState.viewMonth}월`}</StyDiv>
      <StyBtn onClick={() => dateDispatch({ type: "NEXT" })}>&gt;</StyBtn>
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
