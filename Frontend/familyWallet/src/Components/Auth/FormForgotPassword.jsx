import React, { useState } from "react";
import { useUserContext } from "../../context/userContext";
import layouts from "../../styles/layouts.module.css";

function FormForgotPassword({ navigate }) {
  const { forgotPasswordEmail } = useUserContext();

  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPasswordEmail(navigate, email);

    setEmail("");
  };

  return (
    <form className={`${layouts.loginForm}`}>
      <div className={`${layouts.loginForm2}`}>
        <h1 className={`${layouts.headerAuthForm}`}>
          Enter email to reset password
        </h1>
        <div className={`${layouts.textDivInput}`}>
          <label htmlFor="email" className={`${layouts.labelInput}`}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            name="email"
            className={`${layouts.inputAuthForm}`}
            placeholder=""
          />
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
  );
}

export default FormForgotPassword;
