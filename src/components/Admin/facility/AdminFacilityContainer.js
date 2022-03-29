import React, { useState } from 'react';
import AdminFacilityList from './AdminFacilityList';
import AdminFacilityForm from './AdminFacilityForm';
import styled from "styled-components";

function AdminFacilityContainer() {
  const [fid, setFid] = useState(null);

  return (
    <ListContainer>
      <AdminFacilityList setFid={setFid} />
      <AdminFacilityForm />
    </ListContainer>
  );
}

const ListContainer = styled.div`
  width: 90vw;
  height: 90vh;
  padding: 1rem;
  border: 1px solid;
  border-radius: 3px;
`;

export default AdminFacilityContainer;