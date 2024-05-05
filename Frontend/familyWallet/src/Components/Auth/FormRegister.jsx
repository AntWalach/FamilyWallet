import React, { useState } from "react";
import { useUserContext } from "../../context/userContext";
import layouts from "../../styles/layouts.module.css";

function FormRegister({ navigate }) {
  const { registerUser, userState, handlerUserInput } = useUserContext();
  const { name, email, password } = userState;
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <form className={`${layouts.loginForm}`}>
      <div className={`${layouts.loginForm2}`}>
        <h1 className={`${layouts.headerAuthForm}`}>Register for an account</h1>
        <p className={`${layouts.pAuthForm}`}>
          Create an account. Already have an account?{" "}
          <a href="/login" className={`${layouts.linkAuthForm}`}>Login here</a>
        </p>
        <div className={`${layouts.textDivInput}`}>
          <label htmlFor="name" className={`${layouts.labelInput}`}>
            Full name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            name="name"
            className={`${layouts.inputAuthForm}`}
            placeholder="Full name"
            onChange={(e) => handlerUserInput("name")(e)}
          />
        </div>
        <div className={`${layouts.textDivInput}`}>
          <label htmlFor="email" className={`${layouts.labelInput}`}>
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            name="email"
            className={`${layouts.inputAuthForm}`}
            placeholder="Email"
            onChange={(e) => handlerUserInput("email")(e)}
          />
        </div>
        <div className={`${layouts.passDivInput}`}>
          <label htmlFor="password" className={`${layouts.labelInput}`}>
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            name="password"
            className={`${layouts.inputAuthForm}`}
            placeholder="Password"
            onChange={(e) => handlerUserInput("password")(e)}
          />
          <button type="button" className={`${layouts.eyeButton}`}>
            {showPassword ? (
              <i className="fa-solid fa-eye-slash" onClick={togglePassword}></i>
            ) : (
              <i className="fa-solid fa-eye" onClick={togglePassword}></i>
            )}
          </button>
        </div>
        <div className="d-flex">
          <button
            type="submit"
            className={`${layouts.btnAuthForm}`}
            disabled={!name || !email || !password}
            onClick={(e) => registerUser(navigate, e)}
          >
            Register Now
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormRegister;
