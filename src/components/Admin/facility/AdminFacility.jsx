import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../modal/loading";
import styled from "styled-components";

export default function AdminFacility() {
  const [facilityList, setFacilityList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getFacilityList() {
      try {
        const response = await axios.get("/manage/facility");
        setIsLoading(false);
        setFacilityList(response.data);
      } catch (error) {
        setIsLoading(false);
        return alert(
          "예약 목록을 불러오는중 알수없는오류가 발생했습니다. 새로고침 해주세요."
        );
      }
    }
    getFacilityList();
  }, []);

  function handleClick(e) {
    const cName = e.target.className;
    const list_id = e.target.parentNode.id;
    switch (cName) {
      case "admin_facility_edit_btn":
        return;
      case "admin_facility_delete_btn":
        return deleteFacility(list_id);
      default:
        return;
    }
  }

  function deleteFacility(list_id) {
    deleteRequest(list_id); // 서버에 삭제 요청 후
    setFacilityList( // state 변경
      facilityList.filter((facility) => facility.fno !== list_id)
    ); 
  }

  async function deleteRequest(list_id) {
    try {
      const response = axios.delete(`/manage/facility/${list_id}`);
      return response.status === 201 && alert("삭제 되었습니다.");
    } catch (error) {
      return alert(
        "알수없는 오류가 발생했습니다. 새로고침후 다시 시도해주세요."
      );
    }
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ul onClick={handleClick}>
            {facilityList.map((facility) => (
              <ListItem key={facility.fno} facility={facility} />
            ))}
          </ul>
          <button className="admin_facility_append_btn">시설 추가</button>
        </>
      )}
    </>
  );
}

function ListItem({ facility }) {
  return (
    <li id={facility.fno}>
      <span>{facility.fno}</span>
      <span>{facility.name}</span>
      <span>{facility.place}</span>
      <span>{facility.placeUrl}</span>
      <button className="admin_facility_edit_btn">수정</button>
      <button className="admin_facility_delete_btn">삭제</button>
    </li>
  );
}

function AppendForm() {
  return (
    <>
    
    </>
  );
}