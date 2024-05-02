import React from 'react'
import FormLogin from '../Components/Auth/FormLogin'
import { useNavigate } from "react-router-dom";

function login() {
  const navigate = useNavigate();
  return (
    <div className="">
      <FormLogin navigate={navigate}/>
    </div>
  )
}

export default login