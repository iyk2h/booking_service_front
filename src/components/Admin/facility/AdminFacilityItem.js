import React from "react";
import styled from "styled-components";

function AdminFacilityItem({ facility, setFid, deleteFacility }) {
  return (
    <ListItem onClick={() => setFid(facility.fno)}>
      <ListData>{facility.fno}</ListData>
      <ListData>{facility.name}</ListData>
      <ListData>{facility.maxHour}</ListData>
      <ListData>{facility.place}</ListData>
      <ListData>{facility.placeUrl}</ListData>
      <button onClick={() => setFid(facility.fno)}>수정</button>
      <button onClick={() => deleteFacility(facility.fno)}>
        삭제
      </button>
    </ListItem>
  );
}

const ListItem = styled.li`
  display: flex;
`;

const ListData = styled.div`
  margin: 0 0.7rem;
`;

export default React.memo(AdminFacilityItem);