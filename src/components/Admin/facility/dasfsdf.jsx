import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loading from "../../modal/loading";
import styled from "styled-components";

const rows = [{ row: "no" }, { row: "이름" }, { row: "위치" }, { row: "url" }];

export default function AdminFacility() {
  const [facilityList, setFacilityList] = useState([]);
  const [changeForm, setChangeForm] = useState(null);
  const [changeFormToggle, setChangeFormToggle] = useState(false);
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
        setChangeForm(
          // 애매
          <ChangeForm
            list_id={list_id}
            changeFacility={changeFacility}
            setChangeFormToggle={() => setChangeFormToggle((prev) => !prev)}
            facility={facilityList.filter(
              (facility) => facility.fno === Number(list_id)
            )}
          />
        );
        return setChangeFormToggle((prev) => !prev);
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
        setFacilityList((prev) =>
          prev.filter((facility) => facility.fno !== Number(list_id))
        );
      }
    } catch (error) {
      return alert(
        "알수없는 오류가 발생했습니다. 새로고침후 다시 시도해주세요."
      );
    }
  }

  async function changeFacility(list_id, data) {
    try {
      const response = await axios.put(`/manage/facility/${list_id}`, data);
      if (response.status === 204) alert("수정되었습니다.");
      const replaced = replaceDataInArray(list_id, data);
      setFacilityList((prev) => replaced);
    } catch (error) {
      return alert(
        "알수없는 오류가 발생했습니다. 새로고침후 다시 시도해주세요."
      );
    }
  }

  function replaceDataInArray(list_id, data) {
    const copy = [];
    for (let i = 0; i < facilityList.length; i++) {
      if (facilityList[i].fno === Number(list_id)) {
        const test = {
          fno: facilityList[i].fno,
          ...data,
        };
        copy.push(test);
      } else {
        copy.push(facilityList[i]);
      }
    }
    return copy;
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <UL onClick={handleClick}>
            {rows.map((item) => (
              <ROW key={item.row}>{item.row}</ROW>
            ))}
            {facilityList.map((facility) => (
              <ListItem key={facility.fno} facility={facility} />
            ))}
          </UL>
          <AppendForm appendFacility={appendFacility} formRef={formRef} />
          {changeFormToggle && changeForm}
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
    <Facility id={facility.fno}>
      <span>{facility.fno}</span>
      <span>{facility.maxHour}</span>
      <span>{facility.name}</span>
      <span>{facility.place}</span>
      <a href={facility.placeUrl}>{facility.placeUrl}</a>
      <button className="admin_facility_change_btn">수정</button>
      <button className="admin_facility_delete_btn">삭제</button>
    </Facility>
  );
}

function ChangeForm({
  list_id,
  facility,
  changeFacility,
  setChangeFormToggle,
}) {
  facility = facility[0];
  const [inputs, setInputs] = useState({
    maxHour: facility.maxHour,
    name: facility.name,
    place: facility.place,
    placeUrl: facility.placeUrl,
  });

  const { maxHour, name, place, placeUrl } = inputs;

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function handleReset() {
    setInputs({
      maxHour: "",
      name: "",
      place: "",
      placeUrl: "",
    });
  }

  function handleClick() {
    changeFacility(list_id, inputs);
    handleReset();
    setChangeFormToggle();
  }

  return (
    <div>
      <div>
        <input
          name="name"
          placeholder="시설 이름"
          value={name}
          onChange={handleChange}
        />
        <input
          name="maxHour"
          type="number"
          placeholder="최대 이용 시간"
          value={maxHour}
          onChange={handleChange}
        />
        <input
          name="place"
          placeholder="위치"
          value={place}
          onChange={handleChange}
        />
        <input
          name="placeUrl"
          placeholder="지도 url"
          value={placeUrl}
          onChange={handleChange}
        />
        <button onClick={setChangeFormToggle}>취소</button>
        <button onClick={handleClick}>변경</button>
      </div>
    </div>
  );
}

const UL = styled.ul`
`;

const ROW = styled.li`
  display: inline-block;
  margin: 1rem 3rem;
  font-weight: bold;
  border-bottom : 1px solid;
`;

const Facility = styled.li`
  display: inline-block;
  margin: 0.4rem 3rem;
`;

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
`;
