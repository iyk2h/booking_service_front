import SignupTemplate from "../../signup/signupTemplate";

export default function AdminSignup() {
  return (
    <>
      <SignupTemplate url="/admin/signup" nextUrl="/admin/login" />
    </>
  );
}
