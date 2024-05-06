import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../../context/userContext";
import layouts from "../../../styles/layouts.module.css";

function ResetPassword() {
  const { resetPassword } = useUserContext();
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    resetPassword(navigate, resetToken, password);
  };
  console.log(resetToken);
  return (
    <div className={`${layouts.formAuth}`}>
      <form className={`${layouts.loginForm}`}>
        <div className={`${layouts.loginForm2}`}>
          <h1 className={`${layouts.headerAuthForm}`}>Reset Your Password!</h1>
          <div className={`${layouts.passDivInput}`}>
            <label htmlFor="password" className={`${layouts.labelInput}`}>
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              name="password"
              placeholder=""
              className={`${layouts.inputAuthForm}`}
            />
            <button
              className={`${layouts.eyeButton}`}
              onClick={togglePassword}
              type="button"
            >
              {showPassword ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>
          </div>
          <div className={`${layouts.passDivInput}`}>
            <label htmlFor="password" className={`${layouts.labelInput}`}>
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              name="password"
              placeholder=""
              className={`${layouts.inputAuthForm}`}
            />
            <button
              className={`${layouts.eyeButton}`}
              onClick={togglePassword}
              type="button"
            >
              {showPassword ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </button>
          </div>
          <div className="d-flex">
            <button
              type="submit"
              onClick={handleSubmit}
              className={`${layouts.btnAuthForm}`}
            >
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
