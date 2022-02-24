import Login from "../../login/login";

export default function AdminLogin() {
  return (
    <>
      <Login url="/admin/login" nextUrl="/admin/dashboard" />
    </>
  );
}