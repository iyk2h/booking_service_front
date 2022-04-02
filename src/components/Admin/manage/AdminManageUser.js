import React from 'react';
import styled from 'styled-components';

function AdminManageUser({ user, deleteUser }) {
  return (
    <LI>
      <div>{user.sid}</div>
      <div>{user.name}</div>
      <div>{user.phone}</div>
      <button onClick={() => deleteUser(user.sid)}>삭제</button>
    </LI>
  );
}

const LI = styled.div`
  display: flex;
`;

export default AdminManageUser;