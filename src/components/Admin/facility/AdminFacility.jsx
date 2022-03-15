import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loading from "../../modal/loading";
import styled from "styled-components";

export default function AdminFacility() {
  const [facilityList, setFacilityList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef({
    maxHour: null,
    name: null,
    place: null,
    placeUrl: null,
  });
  
  const [formData, setFormData] = useState({
    maxHour: null,
    name: null,
    place: null,
    placeUrl: null,
  });

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

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

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

  function handleAppend(e) {
    e.preventDefault();
    appendRequest();
  }

  function deleteFacility(list_id) {
    deleteRequest(list_id);
  }

  async function deleteRequest(list_id) {
    try {
      const response = axios.delete(`/manage/facility/${list_id}`);
      if (response.status === 404) {
        return;
      }
      alert("삭제되었습니다.");
      setFacilityList(
        facilityList.filter((facility) => facility.fno !== list_id)
      );
    } catch (error) {
      return alert(
        "알수없는 오류가 발생했습니다. 새로고침후 다시 시도해주세요."
      );
    }
  }

  async function appendRequest() {
    try {
      const data = {
        "fno" : facilityList.length === 0 ? 1 : facilityList[facilityList.length - 1].fno + 1,
        ...formData
      }

      for(let i=0; i<facilityList.length; i++) {
        if(facilityList[i].name === data.name) { return; }
      }

      const response = axios.post(`/manage/facility/join`, data);
      if(response.status === 201) {
        alert("추가 되었습니다.");
        setFacilityList(facilityList.concat([data]));
      }
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
          <AppendForm handleAppend={handleAppend} handleChange={handleChange} />
        </>
      )}
    </>
  );
}

function ListItem({ facility }) {
  return (
    <li id={facility.fno}>
      <span>{facility.fno}</span>
      <span>{facility.maxHour}</span>
      <span>{facility.name}</span>
      <span>{facility.place}</span>
      <a href={facility.placeUrl}>네이버 지도</a>
      <button className="admin_facility_edit_btn">수정</button>
      <button className="admin_facility_delete_btn">삭제</button>
    </li>
  );
}

function AppendForm({ handleAppend, handleChange }) {
  return (
    <form onSubmit={handleAppend}>
      <input
        type="text"
        name="name"
        placeholder="시설 이름"
        required
        onChange={handleChange}
      />
      <input
        type="number"
        name="maxHour"
        placeholder="최대 이용 시간"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="place"
        placeholder="위치"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        name="placeUrl"
        placeholder="지도url"
        required
        onChange={handleChange}
      />
      <button>시설 추가</button>
    </form>
  );
}
