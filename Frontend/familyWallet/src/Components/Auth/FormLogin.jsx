import React, { useState } from "react";
import { useUserContext } from "../../context/userContext";

function FormLogin({ navigate }) {
  const { loginUser, userState, handlerUserInput } = useUserContext();
  const { email, password } = userState;
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  return (
    <form className="bg-white">
      <div>
        <h1 className="mb-2 text-center">Login to Your account</h1>
        <p className="mb-8 text-center">
          Login now. Don't have an account?{" "}
          <a href="/register">Register here</a>
        </p>
        <div className="d-flex">
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={email}
            name="email"
            className="px-4 py-3"
            placeholder="Email"
            onChange={(e) => handlerUserInput("email")(e)}
          />
        </div>
        <div className="d-relative">
          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            name="password"
            className="px-4 py-3"
            placeholder="Password"
            onChange={(e) => handlerUserInput("password")(e)}
          />
          <button type="button" className="p-1 right-4">
            {showPassword ? (
              <i className="fas fa-eye-slash" onClick={togglePassword}></i>
            ) : (
              <i className="fas fa-eye" onClick={togglePassword}></i>
            )}
          </button>
        </div>
        <div className="">
          <a href="/forgot-password">Forgot password?</a>
        </div>
        <div className="d-flex">
          <button
            type="submit"
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
