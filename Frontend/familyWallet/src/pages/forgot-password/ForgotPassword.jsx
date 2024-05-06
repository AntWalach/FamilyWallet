import React from "react";
import FormForgotPassword from "../../Components/Auth/FormForgotPassword";
import { useNavigate } from "react-router-dom";
import layouts from "../../styles/layouts.module.css";

function ForgotPassword() {
  const navigate = useNavigate();
  return (
    <div className={`${layouts.formAuth}`}>
      <FormForgotPassword navigate={navigate} />
    </div>
  );
}

export default ForgotPassword;
