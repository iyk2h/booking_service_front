import LoginTemplate from "../../login/loginTemplate";

export default function AdminLogin() {
  return (
    <>
      <LoginTemplate url="/admin/login" nextUrl="/admin/dashboard" />
    </>
  );
}