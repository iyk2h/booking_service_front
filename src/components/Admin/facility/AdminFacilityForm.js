import styled from "styled-components";

function AdminFacilityForm({ handleSubmit, form, onChange, reset, fid }) {
  const { name, maxHour, place, placeUrl } = form;

  return (
    <FORM onSubmit={handleSubmit}>
      <INPUT
        name="name"
        onChange={onChange}
        value={name}
        placeholder="이름"
        required
      />
      <INPUT
        name="maxHour"
        onChange={onChange}
        value={maxHour}
        placeholder="최대 이용 시간"
        required
      />
      <INPUT
        name="place"
        onChange={onChange}
        value={place}
        placeholder="위치"
        required
      />
      <INPUT
        name="placeUrl"
        onChange={onChange}
        value={placeUrl}
        placeholder="지도 URL"
        required
      />
      <Btns>
        <Btn>{fid ? "수정" : "생성"}</Btn>
        <Btn onClick={reset}>초기화</Btn>
      </Btns>
    </FORM>
  );
}

const FORM = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const INPUT = styled.input`
  width: 50%;
  max-width: 200px;
  min-height: 30px;
  border-radius: 4px;
  border: 1px solid silver;
  margin: 2px 2px;
`;

const Btn = styled.button`
  width: 90px;
  height: 25px;
  border: none;
  border-radius: 2px;
  background-color: mediumseagreen;
  color: white;
  font-weight: bold;
  font-size: 11px;
  margin: 4px 4px;
`;

const Btns = styled.div`
  display: flex;
  flex-direction: row;
`;
export default AdminFacilityForm;
