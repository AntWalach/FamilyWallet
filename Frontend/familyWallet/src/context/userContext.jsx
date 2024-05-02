import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";


const UserContext = React.createContext();

const BASE_URL = "http://localhost:5000/api/v1/";

export const UserProvider = ({ children }) => {


  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (navigate, e) => {
    e.preventDefault();
    if (
      !userState.email.includes("@") ||
      !userState.password ||
      userState.password.length < 6
    ) {
      toast.error("Please enter a valid email and password (min 6 characters)");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}register`, userState);
      console.log(res.data);
      toast.success("User registered successfully");

      setUserState({
        name: "",
        email: "",
        password: "",
      });
      
      navigate("/login");
    } catch (error) {
      console.log("Error registering user", error);
      toast.error(error.response.data.message);
    }
  };

  const handlerUserInput = (name) => (e) => {
    const value = e.target.value;
    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <UserContext.Provider value={{ registerUser, userState, handlerUserInput, }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
