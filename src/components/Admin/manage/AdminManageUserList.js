import React from "react";
import AdminManageUser from "./AdminManageUser";
import Loading from "../../modal/loading";

const rows = [{ row: "학번" }, { row: "이름" }, { row: "연락처" }];

function AdminManageUserList({ state, deleteUser }) {
  const { loading, data: users, error } = state;

  if (loading) return <Loading />;
  if (error) return <h1>에러 발생!</h1>;
  if (!users) return null;

  return (
    <ul>
      {rows.map((row) => (
        <li key={row.row}>{row.row}</li>
      ))}
      {users.map((user) => (
        <AdminManageUser key={user.sid} user={user} deleteUser={deleteUser} />
      ))}
    </ul>
  );
}

export default AdminManageUserList;
