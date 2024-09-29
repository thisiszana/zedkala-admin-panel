import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export default function AuthForm({ type }) {
  return (
    <>
      {type === "login" && <LoginPage />}
      {type === "register" && <RegisterPage />}
    </>
  );
}
