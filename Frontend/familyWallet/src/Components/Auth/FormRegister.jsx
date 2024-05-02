import React from "react";
import { eye } from "../../utils/icons";
import { useUserContext } from "../../context/userContext";

function FormRegister({ navigate }) {
  const { registerUser, userState, handlerUserInput } = useUserContext();
  const { name, email, password } = userState;

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(navigate, e);
  };
  return (
    <form className="bg-white" onSubmit={handleSubmit}>
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
            type="text"
            id="password"
            value={password}
            name="password"
            className="px-4 py-3"
            placeholder="Password"
            onChange={(e) => handlerUserInput("password")(e)}
          />
          <button className="p-1 right-4">{eye}</button>
        </div>
        <div className="">
          <a href="/forgot-password">Forgot password?</a>
        </div>
        <div className="d-flex">
          <button
            type="submit"
            disabled={!name || !email || !password}
            onClick={registerUser}
          >
            Register Now
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormRegister;
