import SignupTemplate from "./signupTemplate";

export default function Signup() {
  return (
    <>
      <SignupTemplate url="/signup" nextUrl="/login" />
    </>
  );
}