import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../../context/userContext";
import layouts from "../../../styles/layouts.module.css";
function VerifyUser() {
  const { verificationToken } = useParams();
  const { verifyUser } = useUserContext();
  const navigate = useNavigate();

  const handleVerifyClick = () => {
    verifyUser(navigate, verificationToken);
  };
  return (
    <div className={`${layouts.forgotPass}`}>
      <div className={`${layouts.loginForm}`}>
        <h1 className={`${layouts.loginForm15}`}>Verify your account</h1>
        <button
          className={`${layouts.loginForm16}`}
          onClick={handleVerifyClick}
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default VerifyUser;
