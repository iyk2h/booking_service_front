import { useEffect, useState } from "react";
import Loading from "../../modal/loading";
import axios from "axios";
import styled from "styled-components";

const rows = [{ row: "학번" }, { row: "이름" }, { row: "연락처" }];

export default function AdminManage() {
  const [loading, setLoading] = useState(true);
  const [studentsList, setStudentsList] = useState([]);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function getStudentsList() {
      try {
        const response = await axios.get("/manage/students");
        setLoading(false);
        setStudentsList(response.data);
      } catch (error) {
        if (error.response.status === 404) alert("요청 경로 오류");
      }
    }
    getStudentsList();
  }, []);

  async function deleteUser(e) {
    const sid = e.target.parentNode.id;
    try {
      await axios.delete(`/manage/students/${sid}`);
      alert("삭제 되었습니다.");
      const test = studentsList.filter((student) => {
        return Number(student.sid) !== Number(sid);
      });
      setStudentsList(test);
      setResult((prev) => null);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function searchBySid(e) {
    e.preventDefault();
    console.log({search})
    studentsList.forEach((student) => {
      if (Number(student.sid) === Number(search)) {
        return setResult((prev) => (
          <ListItem info={student} deleteUser={deleteUser} />
        ));
      }
    });
    console.log({result});
    if (!result) {
      setResult((prev) => "결과가 존재하지 않습니다.");
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SearchForm
            search={search}
            handleChange={handleChange}
            searchBySid={searchBySid}
          />
          {result}
          {rows.map((item) => {
            return <li key={item.row}>{item.row}</li>;
          })}
          <UserList studentsList={studentsList} deleteUser={deleteUser} />
        </>
      )}
    </>
  );
}

function UserList({ studentsList, deleteUser }) {
  return (
    <ul>
      {studentsList.map((student) => {
        return (
          <ListItem key={student.sid} info={student} deleteUser={deleteUser} />
        );
      })}
    </ul>
  );
}

function ListItem({ info, deleteUser }) {
  return (
    <LI id={info.sid}>
      <div>{info.sid}</div>
      <div>{info.name}</div>
      <div>{info.phone}</div>
      <button onClick={deleteUser}>삭제</button>
    </LI>
  );
}

function SearchForm({ search, handleChange, searchBySid }) {
  return (
    <form onSubmit={searchBySid}>
      <label>학번 검색</label>
      <input value={search} onChange={handleChange} />
      <button>검색</button>
    </form>
  );
}

const LI = styled.div`
  display: flex;
`;
