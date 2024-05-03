import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../../context/userContext";
function VerifyUser() {
  const { verificationToken } = useParams();
  const { verifyUser } = useUserContext();
  const navigate = useNavigate();

  const handleVerifyClick = () => {
    verifyUser(navigate, verificationToken);
  };
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="d-flex flex-col justify-content-center align-items-center ">
          <div className="bg-white">
            <h1>Verify your account</h1>
            <button
              className="btn btn-success align-items-center"
              onClick={handleVerifyClick}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyUser;
