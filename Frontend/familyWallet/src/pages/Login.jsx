import React from "react";
import FormLogin from "../Components/Auth/FormLogin";
import { useNavigate } from "react-router-dom";
import layouts from "../styles/layouts.module.css";
function login() {
  const navigate = useNavigate();
  return (
    <div className={`${layouts.formAuth}`}>
      <FormLogin navigate={navigate} />
    </div>
  );
}

export default login;
