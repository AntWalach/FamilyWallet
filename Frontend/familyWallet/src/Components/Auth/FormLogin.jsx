import React, { useState } from "react";
import { useUserContext } from "../../context/userContext";
import layouts from "../../styles/layouts.module.css";
function FormLogin({ navigate }) {
  const { loginUser, userState, handlerUserInput } = useUserContext();
  const { email, password } = userState;
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  return (
    <form className={`${layouts.loginForm}`}>
      <div className={`${layouts.loginForm2}`}>
        <h1 className={`${layouts.headerAuthForm}`}>Login to Your account</h1>
        <p className={`${layouts.pAuthForm}`}>
          Login now. Don't have an account?{" "}
          <a href="/register" className={`${layouts.linkAuthForm}`}>
            Register here
          </a>
        </p>
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
              <i className="fas fa-eye-slash" onClick={togglePassword}></i>
            ) : (
              <i className="fas fa-eye" onClick={togglePassword}></i>
            )}
          </button>
        </div>
        <div className={`${layouts.divLinkAuthForm}`}>
          <a href="/forgot-password" className={`${layouts.linkAuthForm}`}>
            Forgot password?
          </a>
        </div>
        <div className="d-flex">
          <button
            type="submit"
            className={`${layouts.btnAuthForm}`}
            disabled={!email || !password}
            onClick={(e) => loginUser(navigate, e)}
          >
            Login Now
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormLogin;
