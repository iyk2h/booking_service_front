import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loading from "../../modal/loading";
import styled from "styled-components";

const menu = [
  { row : 'no' },
  { row : '이름' },
  { row : '위치' },
  { row : 'url' },
];

export default function AdminFacility() {
  const [facilityList, setFacilityList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const maxHourRef = useRef("");
  const nameRef = useRef("");
  const placeRef = useRef("");
  const placeUrlRef = useRef("");
  const formRef = {
    maxHourRef,
    nameRef,
    placeRef,
    placeUrlRef,
  };

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
      case "admin_facility_change_btn":
        return;
      case "admin_facility_delete_btn":
        return deleteFacility(list_id);
      default:
        return;
    }
  }

  function handleReset() {
    maxHourRef.current.value = "";
    nameRef.current.value = "";
    placeRef.current.value = "";
    placeUrlRef.current.value = "";
  }

  async function appendFacility(e) {
    e.preventDefault();
    try {
      const data = {
        maxHour: maxHourRef.current.value,
        name: nameRef.current.value,
        place: placeRef.current.value,
        placeUrl: placeUrlRef.current.value,
      };

      for (let i = 0; i < facilityList.length; i++) {
        if (facilityList[i].name === data.name) {
          alert("이미 존재하는 시설입니다.");
          handleReset();
          return;
        }
      }
      const response = await axios.post("/manage/facility/join", data);
      if (response.status === 201) {
        alert("추가 되었습니다.");
        data["fno"] = facilityList[facilityList.length - 1].fno + 1;
        setFacilityList((prev) => prev.concat([data]));
        handleReset();
      }
    } catch (error) {
      return alert(
        "알수없는 오류가 발생했습니다. 새로고침후 다시 시도해주세요."
      );
    }
  }

  async function deleteFacility(list_id) {
    try {
      const response = await axios.delete(`/manage/facility/${list_id}`);
      if (response.status === 204) {
        alert("삭제되었습니다.");
        setFacilityList(prev => prev.filter(facility => facility.fno !== Number(list_id)))
      }
    } catch (error) {
      return alert(
        "알수없는 오류가 발생했습니다. 새로고침후 다시 시도해주세요."
      );
    }
  }

  async function changeFacility(list_id) {
    try {
      const response = await axios.put(`/manage/facility/${list_id}`);
      // if (response.status === 204) {
      //   alert("삭제되었습니다.");
      //   setFacilityList(prev => prev.filter(facility => facility.fno !== Number(list_id)))
      // }
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
          <UL onClick={handleClick}>
            {menu.map(item => <li key={item.row}>{item.row}</li>)}
            {facilityList.map((facility) => (
              <ListItem key={facility.fno} facility={facility} />
            ))}
          </UL>
          <AppendForm appendFacility={appendFacility} formRef={formRef} />
        </>
      )}
    </>
  );
}

function AppendForm({ appendFacility, formRef }) {
  return (
    <form onSubmit={appendFacility}>
      <input
        type="text"
        name="name"
        placeholder="시설 이름"
        required
        ref={formRef.nameRef}
      />
      <input
        type="number"
        name="maxHour"
        placeholder="최대 이용 시간"
        ref={formRef.maxHourRef}
      />
      <input
        type="text"
        name="place"
        placeholder="위치"
        required
        ref={formRef.placeRef}
      />
      <input
        type="text"
        name="placeUrl"
        placeholder="지도url"
        required
        ref={formRef.placeUrlRef}
      />
      <button>시설 추가</button>
    </form>
  );
}

function ListItem({ facility }) {
  return (
    <li id={facility.fno}>
      <span>{facility.fno}</span>
      <span>{facility.maxHour}</span>
      <span>{facility.name}</span>
      <span>{facility.place}</span>
      <a href={facility.placeUrl}>{facility.placeUrl}</a>
      <button className="admin_facility_change_btn">수정</button>
      <button className="admin_facility_delete_btn">삭제</button>
    </li>
  );
}

const UL = styled.ul`
  display: flex;
`;