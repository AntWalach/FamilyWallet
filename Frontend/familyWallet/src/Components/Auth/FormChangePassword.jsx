import React, { useState } from "react";
import { useUserContext } from "../../context/userContext";
import layouts from "../../styles/layouts.module.css";

function FormChangePassword() {
  const { changePassword } = useUserContext();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const currentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const newPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword(currentPassword, newPassword);

    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <form className={`${layouts.loginForm}`}>
      <div className={`${layouts.loginForm2}`}>
        <div className={`${layouts.passDivInput}`}>
          <label htmlFor="password" className={`${layouts.labelInput}`}>
            Current Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={currentPassword}
            onChange={currentPasswordChange}
            id="password"
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
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={newPasswordChange}
            id="password"
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
            Change Password
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormChangePassword;
