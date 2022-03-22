import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminManage() {
//   const [studentsList, setStudentsList] = useState()

  useEffect(() => {
    async function getStudentsList() {
      try {
        const response = await axios.get('​/manage​/students');
        console.log(response);
      } catch(error) {
        console.log(error);
      }
    }
    getStudentsList();
  }, [])

  return (
    <>
      <div>학생 관리</div>
    </>
  );
}