import React from "react";
import FormRegister from "../Components/Auth/FormRegister";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  return (
    <div>
      <FormRegister navigate={navigate}/>
    </div>
  );
}

export default Register;
