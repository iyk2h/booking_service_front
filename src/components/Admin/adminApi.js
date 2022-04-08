import axios from "axios";

// Admin Booking
export async function fetchBooking() {
  const response = await axios.get("/manage/booking");
  return response.data;
}

export async function deleteBooking(bno) {
  await axios.delete(`/manage/booking/${bno}`);
}

// Admin Facility
export async function postFacility(form) {
  await axios.post("/manage/facility/join", form);
}

export async function removeFacility(fno) {
  await axios.delete(`/manage/facility/${fno}`);
}

export async function putFacility(fno, form) {
  await axios.put(`/manage/facility/${fno}`, form);
}

export async function getFacility() {
  const response = await axios.get("/manage/facility");
  return response.data;
}

// Admin Manage Students
export async function getStudents() {
  const response = await axios.get(`/manage/students`);
  return response.data;
}

export async function deleteStudents(sid) {
  await axios.delete(`/manage/students/${sid}`);
}
