import React from "react";
import FormLogin from "../Components/Auth/FormLogin";
import { useNavigate } from "react-router-dom";

function login() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid">
      <div className="row vh-100 justify-content-center align-items-center">
        <div className="col">
          <FormLogin navigate={navigate} />
        </div>
      </div>
    </div>
  );
}

export default login;
