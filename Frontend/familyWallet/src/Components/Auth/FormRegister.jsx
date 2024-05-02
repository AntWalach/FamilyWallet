import React, { useState } from "react";
import { useUserContext } from "../../context/userContext";

function FormRegister({ navigate }) {
  const { registerUser, userState, handlerUserInput } = useUserContext();
  const { name, email, password } = userState;
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <form className="bg-white">
      <div>
        <h1 className="mb-2 text-center">Register for an account</h1>
        <p className="mb-8 text-center">
          Create an account. Already have an account?{" "}
          <a href="/login">Login here</a>
        </p>
        <div className="d-flex">
          <label htmlFor="name" className="mb-1">
            Full name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            name="name"
            className="px-4 py-3"
            placeholder="Full name"
            onChange={(e) => handlerUserInput("name")(e)}
          />
        </div>
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
        <div className="d-flex">
          <button
            type="submit"
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
