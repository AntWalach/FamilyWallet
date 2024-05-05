import React from "react";
import FormRegister from "../Components/Auth/FormRegister";
import { useNavigate } from "react-router-dom";
import layouts from "../styles/layouts.module.css";
function Register() {
  const navigate = useNavigate();
  return (
    <div className={`${layouts.formAuth}`}>
      <FormRegister navigate={navigate} />
    </div>
  );
}

export default Register;
