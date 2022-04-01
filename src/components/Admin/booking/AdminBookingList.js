import React from "react";
import AdminBookingItem from "../facility/AdminFacilityItem";
import Loading from "../../modal/loading";

function AdminBookingList({ state, deleteBooking }) {
  const { loading, data: bookingList, error } = state;

  if (loading) return <Loading />;
  if (error) return <h1>에러 발생!</h1>;
  if (!bookingList) return null;
  
  return (
    <ul>
      {bookingList.map((booking) => (
        <AdminBookingItem booking={booking} deleteBooking={deleteBooking} />
      ))}
    </ul>
  );
}

export default AdminBookingList;
