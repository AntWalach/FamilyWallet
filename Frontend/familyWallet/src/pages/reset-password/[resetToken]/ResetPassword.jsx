import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../../context/userContext";
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
    <form className="">
      <div className="">
        <h1 className="">Reset Your Password!</h1>
        <div className="">
          <label htmlFor="email" className="">
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            name="password"
            placeholder=""
            className=""
          />
          <button className="" onClick={togglePassword} type="button">
            {showPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </button>
        </div>
        <div className="">
          <label htmlFor="email" className="">
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            name="password"
            placeholder=""
            className=""
          />
          <button className="" onClick={togglePassword} type="button">
            {showPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </button>
        </div>
        <div className="">
          <button type="submit" onClick={handleSubmit} className="">
            Reset Password
          </button>
        </div>
      </div>
    </form>
  );
}

export default ResetPassword;
