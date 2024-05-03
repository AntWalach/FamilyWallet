import React from "react";
import FormForgotPassword from "../../Components/Auth/FormForgotPassword";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      Forgot Pass <br />
      <a href="/login"> LOGIN</a> <br />
      <a href="/register"> REGISTER</a>
      <FormForgotPassword navigate={navigate} />
    </div>
  );
}

export default ForgotPassword;
