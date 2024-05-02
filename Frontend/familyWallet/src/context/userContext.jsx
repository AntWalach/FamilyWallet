import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const UserContext = React.createContext();

const BASE_URL = "http://localhost:5000/api/v1/";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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

  const loginUser = async (navigate, e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}login`,
        {
          email: userState.email,
          password: userState.password,
        },
        { withCredentials: true }
      );

      toast.success("User logged in successfully");
      setUserState({
        email: "",
        password: "",
      });

      navigate("/familywallet");
      //[FIX]to fix, data is not loading, u have to reload page to load the data
      location.reload()
      //to fix
    } catch (error) {
      console.log("Error login user", error);
      toast.error(error.response.data.message);
    }
  };

  const userLoginStatus = async (navigate) => {
    let loggedIn = false;
    try {
      const res = await axios.get(`${BASE_URL}login-status`, {
        withCredentials: true,
      });

      loggedIn = !!res.data;
      setLoading(false);

      if (!loggedIn) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Error getting user login status", error);
    }

    return loggedIn;
  };

  const logoutUser = async (navigate) => {
    try {
      const res = await axios.get(`${BASE_URL}logout`, {
        withCredentials: true,
      });
      toast.success("User logged out successfully");

      navigate("/login");
    } catch (error) {
      console.log("Error logging out user", error);
      toast.error(error.response.data.message);
    }
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}user`, {
        withCredentials: true,
      });
      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });
      setLoading(false);
    } catch (error) {
      console.log("Error getting user details", error);
      setLoading(false);
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

  useEffect(() => {
    const loginStatusGetUser = async () => {
      const isLoggedIn = await userLoginStatus();
      console.log("isLoggedIn",isLoggedIn)
      if (isLoggedIn) {
        getUser();
      }
    };
    loginStatusGetUser();
  }, []);
console.log(user)
  return (
    <UserContext.Provider
      value={{
        registerUser,
        userState,
        handlerUserInput,
        loginUser,
        logoutUser,
        userLoginStatus, 
        user
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
