import React from "react";
import FormRegister from "../Components/Auth/FormRegister";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className=" row vh-100 justify-content-center align-items-center">
        <div className="col">
          <FormRegister navigate={navigate} />
        </div>
      </div>
    </div>
  );
}

export default Register;
