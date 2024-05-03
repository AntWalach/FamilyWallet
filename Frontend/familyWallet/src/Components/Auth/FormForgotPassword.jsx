import React, { useState } from "react";
import { useUserContext } from "../../context/userContext";

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
    <form className="">
      <div className="">
        <h1 className="">Enter email to reset password</h1>
        <div className="">
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            name="email"
            placeholder=""
            className=""
          />
        </div>
        <div className="flex">
          <button type="submit" onClick={handleSubmit} className="">
            Reset Password
          </button>
        </div>
      </div>
      <img src="/flurry.png" alt="" />
    </form>
  );
}

export default FormForgotPassword;
